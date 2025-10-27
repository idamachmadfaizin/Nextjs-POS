import { getCookieCache } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await getCookieCache(request);
  const { pathname } = request.nextUrl;

  if (
    !session &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/sign-up")
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)",// claude
    // "/((?!_next/static|_next/image|favicon.ico).*)",//chatgpt
  ],
};
