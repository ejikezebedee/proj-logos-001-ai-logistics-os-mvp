import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { createAuthService } from "@/lib/auth/service";
import { assertSameOrigin, parseRequest } from "@/app/api/auth/route-utils";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { email } = await parseRequest(request, forgotPasswordSchema);
    await createAuthService().forgotPassword(email);
  } catch {
    // A generic accepted response prevents account enumeration and provider leakage.
  }
  return NextResponse.json({ accepted: true }, { status: 202 });
}
