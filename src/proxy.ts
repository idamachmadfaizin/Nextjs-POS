import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Unauthorized
  if (!session && !pathname.startsWith("/auth")) {
    const loginUrl = new URL("/auth/login", request.url);

    if (pathname !== "/") {
      loginUrl.searchParams.set("next", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  // Authorized but trying to access auth pages
  if (session && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)", // claude
    // "/((?!_next/static|_next/image|favicon.ico).*)",//chatgpt
  ],
};
