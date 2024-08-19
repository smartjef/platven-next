import { NextRequest, NextResponse } from 'next/server';
import { authCookieConfig } from './constants';
import { decode, JwtPayload } from 'jsonwebtoken';
import { serialize } from 'cookie';

const redirectToAuth = (request: NextRequest) => {
  const authCookie = request.cookies.get(authCookieConfig.name)?.value;
  const callbackUrl = request.nextUrl.pathname;

  const serializedCookieToken = serialize(
    authCookieConfig.name,
    authCookie ?? "",
    {
      ...authCookieConfig.config,
      maxAge: -1,
    },
  );

  const headers = new Headers();
  headers.append('Set-Cookie', serializedCookieToken);
  return NextResponse.redirect(
    new URL(
      `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      request.url,
    ),
    { headers },
  );
};

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(authCookieConfig.name)?.value;
  const isAuthenticated = decode(authCookie ?? '') as JwtPayload | null;
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

  if (!isAuthenticated && isProtected) {
    return redirectToAuth(request);
  }

  if (!(isAuthenticated as any).accountVerified) {
    return NextResponse.redirect(
      new URL(
        `/verify?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url,
      ),
    );
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
