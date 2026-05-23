import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";

import {
  getRoleHome,
  isRoleAllowedForPath,
  requiresAuth,
} from "@pulse/policy-edge";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!requiresAuth(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session?.user?.role) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isRoleAllowedForPath(session.user.role, pathname)) {
    return NextResponse.redirect(
      new URL(getRoleHome(session.user.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/:path*",
    "/trainer/:path*",
    "/admin/:path*",
    "/book/:path*",
    "/sessions/:path*",
    "/api/upload",
  ],
};
