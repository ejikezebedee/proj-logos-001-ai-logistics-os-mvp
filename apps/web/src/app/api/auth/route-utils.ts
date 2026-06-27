import { NextResponse } from "next/server";
import { z } from "zod";

export async function parseRequest<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  const body = await request.json().catch(() => null);
  return schema.parse(body);
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    throw new Error("Cross-origin authentication request blocked.");
  }
}

export function authErrorResponse(error: unknown): NextResponse {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: "Review the highlighted authentication fields." }, { status: 422 });
  }
  const message = error instanceof Error ? error.message : "Authentication could not be completed.";
  const configurationError = message.includes("AUTH_SESSION_SECRET") || message.includes("BACKEND_API_BASE_URL");
  const verificationError = message.includes("verification code") || message.includes("verification challenge");
  const crossOriginError = message.includes("Cross-origin authentication request blocked");
  return NextResponse.json(
    {
      message: crossOriginError
        ? "Authentication request blocked."
        : configurationError
        ? "Authentication is not configured on this environment."
        : verificationError
          ? "The verification code or challenge is invalid or expired."
          : "The credentials could not be verified.",
    },
    { status: crossOriginError ? 403 : configurationError ? 503 : 401 },
  );
}
