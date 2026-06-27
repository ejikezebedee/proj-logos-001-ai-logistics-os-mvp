import "server-only";

import { roles, type Role } from "@/config/permissions";
import type {
  AuthChallenge,
  AuthGrant,
  AuthServiceResult,
  AuthSession,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types";
import { createApiClient } from "@/lib/api/client";
import { createProductionApiAdapter } from "@/lib/api/adapter";
import { signToken, verifyToken } from "@/lib/auth/token";

export interface AuthService {
  login(input: LoginRequest): Promise<AuthServiceResult>;
  register(input: RegisterRequest): Promise<AuthGrant>;
  forgotPassword(email: string): Promise<void>;
  verifyTwoFactor(challenge: AuthChallenge, code: string): Promise<AuthGrant>;
  refresh(refreshToken: string): Promise<AuthGrant>;
}

const roleAliases: Readonly<Record<string, Role>> = {
  disponent: "logistic_disponent",
  warehouse: "warehouse_staff",
  finance: "finance_admin",
  compliance: "compliance_admin",
  support: "support_agent",
  admin: "super_admin",
  forwarder: "freight_forwarder",
  fleet: "fleet_manager",
};

function roleFromEmail(email: string): Role {
  const parts = email.toLowerCase().split("@")[0]?.split(/[.+-]/) ?? [];
  const exactRole = parts.find((part): part is Role => roles.includes(part as Role));
  if (exactRole !== undefined) return exactRole;
  const alias = parts.find((part) => part in roleAliases);
  return alias ? roleAliases[alias] ?? "customer" : "customer";
}

function mockSession(email: string, displayName?: string): Omit<AuthSession, "expiresAt"> {
  const role = roleFromEmail(email);
  return {
    userId: `mock-${role}`,
    organizationId: "mock-logistics-organization",
    displayName: displayName ?? role.split("_").map((word) => `${word[0]?.toUpperCase()}${word.slice(1)}`).join(" "),
    email,
    roles: [role],
  };
}

async function mockGrant(session: Omit<AuthSession, "expiresAt">): Promise<AuthGrant> {
  const accessExpiresAt = Date.now() + 15 * 60 * 1000;
  const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return {
    session,
    accessToken: await signToken("mock_access", { session }, accessExpiresAt),
    refreshToken: await signToken("mock_refresh", { session }, refreshExpiresAt),
    accessExpiresAt,
    refreshExpiresAt,
  };
}

function createMockAuthService(): AuthService {
  return {
    async login(input) {
      const session = mockSession(input.email);
      if (input.email.toLowerCase().split("@")[0]?.includes("2fa")) {
        return {
          status: "2fa_required",
          challenge: {
            challengeId: crypto.randomUUID(),
            email: input.email,
            remember: input.remember,
            intendedSession: session,
          },
        };
      }
      return { status: "authenticated", grant: await mockGrant(session) };
    },
    async register(input) {
      return mockGrant(mockSession(input.email, input.displayName));
    },
    async forgotPassword() {
      return undefined;
    },
    async verifyTwoFactor(challenge, code) {
      if (code !== "246810" || !challenge.intendedSession) {
        throw new Error("The verification code is invalid or expired.");
      }
      return mockGrant(challenge.intendedSession);
    },
    async refresh(refreshToken) {
      const payload = await verifyToken(refreshToken, "mock_refresh");
      if (!payload?.session) throw new Error("The refresh session is invalid or expired.");
      return mockGrant(payload.session);
    },
  };
}

function createBackendAuthService(): AuthService {
  const baseUrl = process.env.BACKEND_API_BASE_URL;
  if (!baseUrl) throw new Error("BACKEND_API_BASE_URL is required when API_MODE is production.");
  const auth = createApiClient(createProductionApiAdapter(baseUrl)).auth;

  return {
    login: (input) => auth.command({ path: "/login", method: "POST", body: input }),
    register: (input) => auth.command({ path: "/register", method: "POST", body: input }),
    forgotPassword: (email) => auth.command({ path: "/forgot-password", method: "POST", body: { email } }),
    verifyTwoFactor: (challenge, code) => auth.command({
      path: "/verify-2fa",
      method: "POST",
      body: { challengeId: challenge.challengeId, code },
    }),
    refresh: (refreshToken) => auth.command({ path: "/refresh", method: "POST", body: { refreshToken } }),
  };
}

export function createAuthService(): AuthService {
  return process.env.API_MODE === "mock" || process.env.NODE_ENV === "test"
    ? createMockAuthService()
    : createBackendAuthService();
}
