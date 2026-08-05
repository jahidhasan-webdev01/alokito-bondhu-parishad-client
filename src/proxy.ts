import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const pathname = request.nextUrl.pathname;

  console.log("TOKEN IN PROXY", token);
  console.log("pathname IN PROXY", pathname);

  if (pathname.startsWith("/dashboard") && !token) {
    console.log("LLLLLLELELELELELLE");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};