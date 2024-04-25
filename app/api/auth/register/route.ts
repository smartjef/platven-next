import { loginSchema, registerSchema } from "@/components/forms/auth/schema";
import {
  checkPassword,
  generateUserToken,
  hashPassword,
} from "@/lib/auth-utils";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import { serialize, CookieSerializeOptions, parse } from "cookie";
import { authCookieConfig } from "@/constants";
import { isEmpty } from "lodash";

export async function POST(request: NextRequest) {
  const validation = await registerSchema.safeParseAsync(await request.json());
  //   Validate with zode
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { email, password, phoneNumber } = validation.data;
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
  //   Check password
  if (!isEmpty(errors)) return NextResponse.json(errors, { status: 400 });

  user = await prisma.user.create({
    data: {
      email,
      phoneNumber,
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
