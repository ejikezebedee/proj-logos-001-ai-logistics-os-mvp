import type { Role } from "@/config/permissions";

export interface AuthSession {
  readonly userId: string;
  readonly organizationId: string;
  readonly displayName: string;
  readonly email: string;
  readonly roles: readonly Role[];
  readonly expiresAt: number;
}

export interface AuthGrant {
  readonly session: Omit<AuthSession, "expiresAt">;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessExpiresAt: number;
  readonly refreshExpiresAt: number;
}

export interface AuthChallenge {
  readonly challengeId: string;
  readonly email: string;
  readonly remember: boolean;
  readonly intendedSession?: Omit<AuthSession, "expiresAt">;
}

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
  readonly remember: boolean;
}

export interface RegisterRequest {
  readonly displayName: string;
  readonly organizationName: string;
  readonly email: string;
  readonly password: string;
}

export interface LoginServiceResult {
  readonly status: "authenticated";
  readonly grant: AuthGrant;
}

export interface ChallengeServiceResult {
  readonly status: "2fa_required";
  readonly challenge: AuthChallenge;
}

export type AuthServiceResult = LoginServiceResult | ChallengeServiceResult;

export type AuthRouteResult =
  | { readonly status: "authenticated"; readonly session: AuthSession; readonly redirectTo: string }
  | { readonly status: "2fa_required" };
