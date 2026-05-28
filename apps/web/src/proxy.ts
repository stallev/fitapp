import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";

import {
  getRoleHome,
  isRoleAllowedForPath,
  requiresAuth,
} from "@pulse/policy-edge";

import authConfig from "./auth.config";
import {
  bootstrapLocaleCookie,
  readRequestLocaleCookie,
  redirectWithLocaleCookie,
} from "./lib/i18n/bootstrap-locale-cookie";

const { auth } = NextAuth(authConfig);

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  // Dev: Next.js/HMR, next/font, React, Radix inject inline styles without nonce.
  // Prod: nonce on <style>; style-src-attr for React/Radix style={} / element.style.
  // https://nextjs.org/docs/app/guides/content-security-policy
  const styleDirectives = isDev
    ? ["style-src 'self' 'unsafe-inline'"]
    : [
        `style-src 'self' 'nonce-${nonce}'`,
        "style-src-attr 'unsafe-inline'",
      ];

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    ...styleDirectives,
    "img-src 'self' blob: data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocaleCookie = readRequestLocaleCookie(request) !== null;
  const session = hasLocaleCookie ? null : await auth();

  const localeOptions = {
    sessionLocale: session?.user?.locale,
  };

  // Per-request CSP nonce — forwarded to RSC via x-nonce request header
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = buildCspHeader(nonce);
  const nonceHeaders = { "x-nonce": nonce };

  function withCsp(response: NextResponse): NextResponse {
    response.headers.set("Content-Security-Policy", cspHeader);
    return response;
  }

  if (!requiresAuth(pathname)) {
    return withCsp(
      bootstrapLocaleCookie(request, localeOptions, nonceHeaders),
    );
  }

  const authSession = session ?? (await auth());

  if (!authSession?.user?.role) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return withCsp(redirectWithLocaleCookie(request, loginUrl, localeOptions));
  }

  if (!isRoleAllowedForPath(authSession.user.role, pathname)) {
    return withCsp(
      redirectWithLocaleCookie(
        request,
        new URL(getRoleHome(authSession.user.role), request.url),
        localeOptions,
      ),
    );
  }

  return withCsp(bootstrapLocaleCookie(request, localeOptions, nonceHeaders));
}

export const config = {
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api/).*)",
  ],
};
