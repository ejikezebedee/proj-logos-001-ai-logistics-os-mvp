import "server-only";

import { roles, type Role } from "@/config/permissions";
import type { AuthChallenge, AuthSession } from "@/features/auth/types";

type TokenType = "session" | "mock_access" | "mock_refresh" | "challenge";

interface TokenPayload {
  readonly tokenType: TokenType;
  readonly issuedAt: number;
  readonly expiresAt: number;
  readonly nonce: string;
  readonly session?: Omit<AuthSession, "expiresAt">;
  readonly challenge?: AuthChallenge;
}

const encoder = new TextEncoder();
const roleSet = new Set<string>(roles);

function encodeBase64Url(value: string | Uint8Array): string {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  return Buffer.from(bytes).toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSigningSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

async function signingKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signToken(
  tokenType: TokenType,
  data: { session?: Omit<AuthSession, "expiresAt">; challenge?: AuthChallenge },
  expiresAt: number,
): Promise<string> {
  const payload: TokenPayload = {
    tokenType,
    issuedAt: Date.now(),
    expiresAt,
    nonce: crypto.randomUUID(),
    ...data,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(encodedPayload));
  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

function hasValidSession(value: unknown): value is Omit<AuthSession, "expiresAt"> {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  return (
    typeof session.userId === "string" &&
    typeof session.organizationId === "string" &&
    typeof session.displayName === "string" &&
    typeof session.email === "string" &&
    Array.isArray(session.roles) &&
    session.roles.length > 0 &&
    session.roles.every((role) => typeof role === "string" && roleSet.has(role))
  );
}

export async function verifyToken(token: string, expectedType: TokenType): Promise<TokenPayload | null> {
  const [encodedPayload, encodedSignature, extra] = token.split(".");
  if (!encodedPayload || !encodedSignature || extra) return null;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      Buffer.from(encodedSignature, "base64url"),
      encoder.encode(encodedPayload),
    );
    if (!valid) return null;

    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as TokenPayload;
    if (payload.tokenType !== expectedType || payload.expiresAt <= Date.now()) return null;
    if (payload.session && !hasValidSession(payload.session)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function rolesFromTokenPayload(payload: TokenPayload): readonly Role[] {
  return payload.session?.roles ?? [];
}
