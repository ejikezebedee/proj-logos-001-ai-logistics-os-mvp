import { redirect } from "next/navigation";
import { DisponentShell } from "@/components/layout/disponent-shell";
import { hasPermission } from "@/config/permissions";
import { getSession } from "@/lib/auth/session";

export default async function DisponentLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || !hasPermission(session.roles, "disponent:dashboard:view")) {
    redirect("/access-denied");
  }

  return <DisponentShell displayName={session.displayName} roles={session.roles}>{children}</DisponentShell>;
}
