import { User } from "@prisma/client";
import { pick } from "lodash";
import { sign, verify } from "jsonwebtoken";
import { authCookieConfig } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export const checkPassword = async (userPassword: string, password: string) => {
  const bcrypt = await import("bcrypt");
  const valid = await bcrypt.compare(password, userPassword);
  return valid;
};

export const hashPassword = async (password: string) => {
  const bcrypt = await import("bcrypt");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateUserToken = (user: User) => {
  const token = sign(
    pick(user, ["id", "name", "email", "phoneNumber", "isStaff"]),
    process.env.NEXTAUTH_SECRET as string,
    {
      expiresIn: "1d",
    },
  );
  return token;
};

export async function getHeaderWithCookie() {
  const cookiesModule = await import("next/headers");
  const userCookie = cookiesModule.cookies().get(authCookieConfig.name)?.value;
  const myHeaders = new Headers();
  if (userCookie) {
    myHeaders.append("Cookie", `${authCookieConfig.name}=${userCookie}`);
  }
  return myHeaders;
}

export const getExpiredCookieHeader = (request: NextRequest) => {
  const authCookie = request.cookies.get(authCookieConfig.name)?.value;

  const serializedCookieToken = serialize(
    authCookieConfig.name,
    authCookie ?? "",
    {
      ...authCookieConfig.config,
      maxAge: -1,
    },
  );

  const headers = new Headers();
  headers.append("Set-Cookie", serializedCookieToken);
  return headers;
};

export const redirectToAuth = (request: NextRequest) => {
  const callbackUrl = request.nextUrl.pathname;

  const headers = getExpiredCookieHeader(request);
  return NextResponse.redirect(
    new URL(
      `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      request.url,
    ),
    { headers },
  );
};

export async function getUserIdFromToken() {
  const cookiesModule = await import("next/headers");
  const userCookie = cookiesModule.cookies().get(authCookieConfig.name)?.value;

  if (!userCookie) {
    return null;
  }
  try {
    const { id }: any = verify(
      userCookie as string,
      process.env.NEXTAUTH_SECRET as string,
    );
    return id as string;
  } catch (error) {
    return null;
  }
}

export async function getSessionUser() {
  const prisma = await import("@/prisma/client");
  const userId = await getUserIdFromToken();
  if (!userId) return null;
  return await prisma.prisma.user.findUnique({ where: { id: userId } });
}
