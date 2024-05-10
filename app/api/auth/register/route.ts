import { registerSchema } from "@/components/forms/auth/schema";
import { authCookieConfig } from "@/constants";
import {
  generateUserToken,
  hashPassword
} from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { serialize } from "cookie";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const validation = await registerSchema.safeParseAsync(await request.json());
  //   Validate with zode
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { email, password, phoneNumber, identificationNumber, name, type } =
    validation.data;
  const errors: any = {};
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) errors["email"] = { _errors: ["User with email exist"] };
  user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  });
  if (user)
    errors["phoneNumber"] = { _errors: ["User with phone number exist"] };
  user = await prisma.user.findUnique({
    where: {
      identificationNumber,
    },
  });
  if (user)
    errors["identificationNumber"] = { _errors: ["User with ID number exist"] };
  //   Check password
  if (!isEmpty(errors)) return NextResponse.json(errors, { status: 400 });

  user = await prisma.user.create({
    data: {
      email,
      phoneNumber,
      type,
      identificationNumber,
      name,
      password: await hashPassword(password),
    },
  });
  // If success
  // 1. Generate token
  const token = generateUserToken(user);
  // configur cookie
  const serializedCookieToken = serialize(
    authCookieConfig.name,
    token ?? "",
    authCookieConfig.config,
  );
  const headers = new Headers();
  headers.append("Set-Cookie", serializedCookieToken);
  return NextResponse.json(user, { headers });
}
