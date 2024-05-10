import { staffFormSchema } from "@/components/forms/staff/schema";
import {
  getSessionUser,
  saveMediaFileName,
  strToBool
} from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { z } from "zod";

export const PUT = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const user = await getSessionUser();

  if (
    !z.string().uuid().safeParse(id).success ||
    !(await prisma.user.findUnique({ where: { id } }))
  )
    return NextResponse.json(
      { detail: "Property type not found" },
      { status: 404 },
    );

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

  const currUser = await prisma.user.findUnique({ where: { id } });

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

  let user_ = await prisma.user.findFirst({
    where: { email, id: { not: currUser!.id } },
  });
  if (user_) errors["email"] = { _errors: ["User with email exists"] };
  user_ = await prisma.user.findFirst({
    where: { phoneNumber, id: { not: currUser!.id } },
  });
  if (user_) errors["phoneNumber"] = { _errors: ["User with phone exists"] };
  user_ = await prisma.user.findFirst({
    where: { identificationNumber, id: { not: currUser!.id } },
  });
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
  }

  const newUser = await prisma.user.update({
    where: { id },
    data: {
      email,
      phoneNumber,
      address,
      isStaff: true,
      identificationNumber,
      type,
      name,
      team: { update: { image, position, isActive } },
    },
  });

  return NextResponse.json(newUser);
};
