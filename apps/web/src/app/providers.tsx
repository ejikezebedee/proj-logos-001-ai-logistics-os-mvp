"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import type { AuthSession } from "@/features/auth/types";
import { AuthProvider } from "@/features/auth/auth-context";

export function Providers({ children, initialSession }: { children: ReactNode; initialSession: AuthSession | null }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
          mutations: { retry: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialSession={initialSession}>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
