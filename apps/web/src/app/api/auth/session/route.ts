import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getSession();
  return session
    ? NextResponse.json({ session }, { headers: { "Cache-Control": "no-store" } })
    : NextResponse.json(
        { message: "No active session." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
}
