import { NextResponse } from "next/server";
import { homeForRoles } from "@/config/navigation";
import { registerSchema } from "@/features/auth/schemas";
import type { AuthRouteResult, RegisterRequest } from "@/features/auth/types";
import { setAuthenticatedCookies } from "@/lib/auth/cookies";
import { createAuthService } from "@/lib/auth/service";
import { assertSameOrigin, authErrorResponse, parseRequest } from "@/app/api/auth/route-utils";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const input = await parseRequest(request, registerSchema);
    const registration: RegisterRequest = {
      displayName: input.displayName,
      organizationName: input.organizationName,
      email: input.email,
      password: input.password,
    };
    const grant = await createAuthService().register(registration);
    const response = NextResponse.json<AuthRouteResult>({
      status: "authenticated",
      session: { ...grant.session, expiresAt: grant.accessExpiresAt },
      redirectTo: homeForRoles(grant.session.roles),
    });
    await setAuthenticatedCookies(response, grant, true);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}
