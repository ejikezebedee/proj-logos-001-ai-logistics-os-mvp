"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/auth-context";
import { cn } from "@/lib/cn";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const { logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  async function signOut() {
    setSubmitting(true);
    await logout("manual");
  }

  return (
    <button
      aria-label={compact ? "Sign out" : undefined}
      className={cn(compact ? "icon-button" : "secondary-button")}
      disabled={submitting}
      onClick={() => void signOut()}
      type="button"
    >
      <LogOut aria-hidden="true" size={16} />{compact ? null : submitting ? "Signing out" : "Sign out"}
    </button>
  );
}
