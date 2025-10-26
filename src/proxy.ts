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
    // loginUrl.searchParams.set("redirectTo", pathname);
    console.log("redirect to: " + loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/sign-up"))
  ) {
    console.log("redirect to: " + new URL("/", request.url).toString());
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("proxy next.")
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Specify the routes the middleware applies to
};
