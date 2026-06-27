import { NextResponse } from "next/server";
import { homeForRoles } from "@/config/navigation";
import { loginSchema } from "@/features/auth/schemas";
import type { AuthRouteResult } from "@/features/auth/types";
import { setAuthenticatedCookies, setChallengeCookie } from "@/lib/auth/cookies";
import { createAuthService } from "@/lib/auth/service";
import { assertSameOrigin, authErrorResponse, parseRequest } from "@/app/api/auth/route-utils";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const input = await parseRequest(request, loginSchema);
    const result = await createAuthService().login(input);
    if (result.status === "2fa_required") {
      const response = NextResponse.json<AuthRouteResult>({ status: "2fa_required" });
      await setChallengeCookie(response, { ...result.challenge, remember: input.remember });
      return response;
    }

    const response = NextResponse.json<AuthRouteResult>({
      status: "authenticated",
      session: { ...result.grant.session, expiresAt: result.grant.accessExpiresAt },
      redirectTo: homeForRoles(result.grant.session.roles),
    });
    await setAuthenticatedCookies(response, result.grant, input.remember);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}
