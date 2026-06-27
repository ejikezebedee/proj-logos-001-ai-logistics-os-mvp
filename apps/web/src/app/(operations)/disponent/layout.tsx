import { DisponentShell } from "@/components/layout/disponent-shell";
import { requirePermission } from "@/lib/auth/session";

export default async function DisponentLayout({ children }: { children: React.ReactNode }) {
  const session = await requirePermission("disponent:dashboard:view");
  return <DisponentShell displayName={session.displayName} roles={session.roles}>{children}</DisponentShell>;
}
