import type {
  AuthRouteResult,
  AuthSession,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types";
import { createProductionApiAdapter } from "@/lib/api/adapter";
import { createApiClient } from "@/lib/api/client";

const auth = createApiClient(createProductionApiAdapter("/api")).auth;

export const authApi = {
  login: (input: LoginRequest) =>
    auth.command<AuthRouteResult, LoginRequest>({ path: "/login", method: "POST", body: input }),
  register: (input: RegisterRequest & { confirmPassword: string; acceptTerms: true }) =>
    auth.command<AuthRouteResult, typeof input>({ path: "/register", method: "POST", body: input }),
  forgotPassword: (email: string) =>
    auth.command<{ accepted: true }, { email: string }>({ path: "/forgot-password", method: "POST", body: { email } }),
  verifyTwoFactor: (code: string) =>
    auth.command<AuthRouteResult, { code: string }>({ path: "/verify-2fa", method: "POST", body: { code } }),
  session: () => auth.query<{ session: AuthSession }>("/session"),
  refresh: () => auth.command<{ session: AuthSession }, never>({ path: "/refresh", method: "POST" }),
  logout: () => auth.command<{ loggedOut: true }, never>({ path: "/logout", method: "POST" }),
};
