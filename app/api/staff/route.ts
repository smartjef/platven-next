import { staffFormSchema } from "@/components/forms/staff/schema";
import {
  generateStrongPassword,
  getSessionUser,
  hashPassword,
  saveMediaFileName,
  strToBool,
} from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { sendMail } from "@/services/mail-service";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (request: NextRequest) => {
  const user = await getSessionUser();
  const formData = await request.formData();
  const data = Array.from(formData.entries()).reduce<any>(
    (prev, [key, value]) => {
      if (key === "image") return prev;
      return { ...prev, [key]: value };
    },
    {},
  );
  const validation = await staffFormSchema.safeParseAsync({
    ...data,
    isActive: strToBool(data.isActive),
  });

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const {
    position,
    email,
    phoneNumber,
    address,
    isActive,
    name,
    identificationNumber,
    type,
  } = validation.data;

  const errors: any = {};

  let user_ = await prisma.user.findUnique({ where: { email } });
  if (user_) errors["email"] = { _errors: ["User with email exists"] };
  user_ = await prisma.user.findUnique({ where: { phoneNumber } });
  if (user_) errors["phoneNumber"] = { _errors: ["User with phone exists"] };
  user_ = await prisma.user.findUnique({ where: { identificationNumber } });
  if (user_)
    errors["identificationNumber"] = { _errors: ["User with number exists"] };

  if (!isEmpty(errors)) {
    return NextResponse.json(errors, { status: 400 });
  }

  let image;
  const imageFile = formData.get("image");
  if (imageFile) {
    const { absolutePath, relativePath } = saveMediaFileName(
      "avatar/staff",
      (imageFile as File).name ?? "",
      "jpeg",
    );
    image = relativePath;
    await sharp(await (imageFile as File).arrayBuffer())
      .toFormat("jpeg", { mozjpeg: true })
      .resize(400, 400, { fit: "cover" })
      .toFile(absolutePath);
  } else {
    return NextResponse.json(
      { image: { _errors: ["Image required"] } },
      { status: 400 },
    );
  }

  const password = generateStrongPassword();

  const info = await sendMail({
    toEmail: email,
    text: `Dear ${name}, Login to platven with email:${email} and password:${password} `,
  });

  const hash = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      phoneNumber,
      address,
      name,
      isStaff: true,
      team: { create: { image, position, isActive: isActive } },
      password: hash,
      identificationNumber,
      type,
    },
  });

  return NextResponse.json(newUser);
};
