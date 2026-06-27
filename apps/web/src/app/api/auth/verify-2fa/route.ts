import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { homeForRoles } from "@/config/navigation";
import { verifyTwoFactorSchema } from "@/features/auth/schemas";
import type { AuthRouteResult } from "@/features/auth/types";
import { authCookies, setAuthenticatedCookies } from "@/lib/auth/cookies";
import { createAuthService } from "@/lib/auth/service";
import { verifyToken } from "@/lib/auth/token";
import { assertSameOrigin, authErrorResponse, parseRequest } from "@/app/api/auth/route-utils";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { code } = await parseRequest(request, verifyTwoFactorSchema);
    const challengeToken = (await cookies()).get(authCookies.challenge)?.value;
    if (!challengeToken) throw new Error("The verification challenge is missing or expired.");
    const payload = await verifyToken(challengeToken, "challenge");
    if (!payload?.challenge) throw new Error("The verification challenge is missing or expired.");

    const grant = await createAuthService().verifyTwoFactor(payload.challenge, code);
    const response = NextResponse.json<AuthRouteResult>({
      status: "authenticated",
      session: { ...grant.session, expiresAt: grant.accessExpiresAt },
      redirectTo: homeForRoles(grant.session.roles),
    });
    await setAuthenticatedCookies(response, grant, payload.challenge.remember);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}
