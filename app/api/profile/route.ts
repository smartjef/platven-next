import { NextRequest, NextResponse } from "next/server";
import { serialize, CookieSerializeOptions, parse } from "cookie";
import { authCookieConfig } from "@/constants";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import prisma from "@/prisma/client";
import { getExpiredCookieHeader } from "@/lib/auth-utils";

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get(authCookieConfig.name)?.value;

  if (!token) {
    const response = NextResponse.json(
      { detail: "Unauthorized - Token missing" },
      { headers: getExpiredCookieHeader(request), status: 401 },
    );
    return response;
  }
  try {
    const { id }: any = verify(
      token as string,
      process.env.NEXTAUTH_SECRET as string,
    );
    const user = await prisma.user.findUnique({ where: { id } });
    return NextResponse.json(user);
  } catch (error) {
    let detail;
    if (error instanceof TokenExpiredError) {
      detail = "Unauthorized - Token expired";
    } else if (error instanceof JsonWebTokenError) {
      detail = "Unauthorized - Invalid Token";
    } else {
      detail = "Unauthorized - Invalid Token";
    }
    return NextResponse.json(
      { detail },
      { status: 401, headers: getExpiredCookieHeader(request) },
    );
  }
};
