"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { AuthSession } from "@/features/auth/types";
import { authApi } from "@/features/auth/api";

interface AuthContextValue {
  readonly session: AuthSession | null;
  readonly status: "authenticated" | "unauthenticated";
  completeAuthentication(session: AuthSession): void;
  refreshSession(): Promise<boolean>;
  logout(reason?: "manual" | "expired"): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession: AuthSession | null;
}) {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(initialSession);

  const completeAuthentication = useCallback((nextSession: AuthSession) => {
    setSession(nextSession);
  }, []);

  const logout = useCallback(async (reason: "manual" | "expired" = "manual") => {
    try {
      await authApi.logout();
    } finally {
      setSession(null);
      router.replace(reason === "expired" ? "/session-expired" : "/login?reason=logged-out");
      router.refresh();
    }
  }, [router]);

  const refreshSession = useCallback(async () => {
    try {
      const result = await authApi.refresh();
      setSession(result.session);
      router.refresh();
      return true;
    } catch {
      await logout("expired");
      return false;
    }
  }, [logout, router]);

  useEffect(() => {
    if (!session) return;
    const refreshIn = Math.max(1_000, session.expiresAt - Date.now() - 60_000);
    const timer = window.setTimeout(() => void refreshSession(), refreshIn);
    return () => window.clearTimeout(timer);
  }, [refreshSession, session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        status: session ? "authenticated" : "unauthenticated",
        completeAuthentication,
        refreshSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
