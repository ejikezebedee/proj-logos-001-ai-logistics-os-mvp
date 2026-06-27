import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authCookies, clearAuthCookies, setAuthenticatedCookies } from "@/lib/auth/cookies";
import { createAuthService } from "@/lib/auth/service";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Authentication request blocked." }, { status: 403 });
  }
  const refreshToken = (await cookies()).get(authCookies.refresh)?.value;
  if (!refreshToken) return NextResponse.json({ message: "Refresh session unavailable." }, { status: 401 });

  try {
    const grant = await createAuthService().refresh(refreshToken);
    const response = NextResponse.json({
      session: { ...grant.session, expiresAt: grant.accessExpiresAt },
    });
    // Refresh keeps the browser session-only by default; it never upgrades persistence.
    await setAuthenticatedCookies(response, grant, false);
    return response;
  } catch {
    const response = NextResponse.json({ message: "The session has expired." }, { status: 401 });
    clearAuthCookies(response);
    return response;
  }
}
