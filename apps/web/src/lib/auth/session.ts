import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasPermission, type Permission } from "@/config/permissions";
import type { AuthSession } from "@/features/auth/types";
import { authCookies } from "@/lib/auth/cookies";
import { verifyToken } from "@/lib/auth/token";

export async function getSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get(authCookies.session)?.value;
  if (!token) return null;
  const payload = await verifyToken(token, "session");
  if (!payload?.session) return null;
  return { ...payload.session, expiresAt: payload.expiresAt };
}

export async function requireSession(): Promise<AuthSession> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function requirePermission(permission: Permission): Promise<AuthSession> {
  const session = await requireSession();
  if (!hasPermission(session.roles, permission)) redirect("/access-denied");
  return session;
}
