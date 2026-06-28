import { NextRequest, NextResponse } from "next/server";
import { hasPermission, permissionForPath } from "@/config/permissions";
import { homeForRoles } from "@/config/navigation";
import { authCookies } from "@/lib/auth/cookies";
import { rolesFromTokenPayload, verifyToken } from "@/lib/auth/token";

const authPaths = ["/login", "/register", "/forgot-password", "/verify-2fa"];
const publicPaths = [...authPaths, "/session-expired", "/access-denied"];

function isPathWithin(pathname: string, paths: readonly string[]): boolean {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) return NextResponse.next();

  const token = request.cookies.get(authCookies.session)?.value;
  const payload = token ? await verifyToken(token, "session") : null;
  const userRoles = payload ? rolesFromTokenPayload(payload) : [];

  if (isPathWithin(pathname, authPaths) && payload) {
    return redirectTo(request, homeForRoles(userRoles));
  }

  if (isPathWithin(pathname, publicPaths)) return NextResponse.next();
  if (!payload) {
    const destination = pathname === "/" ? "/login" : `/login?reason=session-required`;
    return redirectTo(request, destination);
  }

  if (pathname === "/") return redirectTo(request, homeForRoles(userRoles));
  const permission = permissionForPath(pathname);
  if (permission && !hasPermission(userRoles, permission)) {
    return redirectTo(request, "/access-denied");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)"],
};
