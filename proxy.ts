import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  // Use getSessionCookie() instead of getSession() - edge-compatible
  const session = await getSessionCookie(request.headers);

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUp = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignIn || isSignUp) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in/:path*', '/sign-up/:path*']
};
