import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Authentication request blocked." }, { status: 403 });
  }
  const response = NextResponse.json({ loggedOut: true });
  clearAuthCookies(response);
  return response;
}
