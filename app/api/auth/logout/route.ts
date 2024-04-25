import { NextRequest, NextResponse } from "next/server";
import { serialize, CookieSerializeOptions, parse } from "cookie";
import { authCookieConfig } from "@/constants";
import { getExpiredCookieHeader } from "@/lib/auth-utils";

export const GET = async (request: NextRequest) => {
  const response = NextResponse.json(
    { detail: "Logged out succesffully!" },
    { headers: getExpiredCookieHeader(request) },
  );
  return response;
};
