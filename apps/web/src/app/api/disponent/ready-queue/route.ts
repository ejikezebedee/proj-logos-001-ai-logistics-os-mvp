import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hasPermission } from "@/config/permissions";
import { createReadyQueueService } from "@/features/disponent/ready-queue/service";
import { ApiError } from "@/lib/api/errors";
import { authCookies } from "@/lib/auth/cookies";
import { getSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Authentication is required." }, { status: 401 });
  if (!hasPermission(session.roles, "disponent:queue:view")) {
    return NextResponse.json({ message: "Queue access is not permitted for this role." }, { status: 403 });
  }

  const accessToken = (await cookies()).get(authCookies.access)?.value;
  try {
    const response = await createReadyQueueService(accessToken).list(request.signal);
    return NextResponse.json(response, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message, correlationId: error.correlationId },
        { status: error.status ?? 502 },
      );
    }
    return NextResponse.json({ message: "The ready queue could not be loaded." }, { status: 502 });
  }
}
