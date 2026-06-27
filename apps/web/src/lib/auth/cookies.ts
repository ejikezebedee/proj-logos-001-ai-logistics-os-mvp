import "server-only";

import { NextResponse } from "next/server";
import type { AuthChallenge, AuthGrant, AuthSession } from "@/features/auth/types";
import { signToken } from "@/lib/auth/token";

export const authCookies = {
  access: "logos_access",
  refresh: "logos_refresh",
  session: "logos_session",
  challenge: "logos_2fa_challenge",
} as const;

const secure = process.env.NODE_ENV === "production";
const baseCookie = { httpOnly: true, secure, sameSite: "strict" as const, path: "/" };

export async function setAuthenticatedCookies(
  response: NextResponse,
  grant: AuthGrant,
  remember: boolean,
): Promise<AuthSession> {
  const session: AuthSession = { ...grant.session, expiresAt: grant.accessExpiresAt };
  const sessionToken = await signToken("session", { session: grant.session }, grant.accessExpiresAt);

  response.cookies.set(authCookies.access, grant.accessToken, {
    ...baseCookie,
    expires: new Date(grant.accessExpiresAt),
  });
  response.cookies.set(authCookies.session, sessionToken, {
    ...baseCookie,
    expires: new Date(grant.accessExpiresAt),
  });
  response.cookies.set(authCookies.refresh, grant.refreshToken, {
    ...baseCookie,
    ...(remember ? { expires: new Date(grant.refreshExpiresAt) } : {}),
  });
  response.cookies.delete(authCookies.challenge);
  return session;
}

export async function setChallengeCookie(response: NextResponse, challenge: AuthChallenge): Promise<void> {
  const expiresAt = Date.now() + 5 * 60 * 1000;
  const token = await signToken("challenge", { challenge }, expiresAt);
  response.cookies.set(authCookies.challenge, token, { ...baseCookie, expires: new Date(expiresAt) });
}

export function clearAuthCookies(response: NextResponse): void {
  Object.values(authCookies).forEach((name) => response.cookies.delete(name));
}
