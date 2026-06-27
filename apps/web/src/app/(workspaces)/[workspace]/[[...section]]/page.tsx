import { notFound } from "next/navigation";
import { LogoutButton } from "@/components/auth/session-actions";
import { workspaceDefinitions } from "@/config/navigation";
import { requirePermission } from "@/lib/auth/session";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspace: string; section?: string[] }>;
}) {
  const { workspace, section } = await params;
  const definition = workspaceDefinitions[workspace];
  if (!definition) notFound();
  const session = await requirePermission(definition.permission);
  const currentArea = section?.join(" / ") ?? "Overview";

  return (
    <main className="workspace-landing">
      <header>
        <div className="brand-lockup">
          <span className="brand-mark">L</span>
          <div><strong>LOGOS</strong><span>Role-scoped workspace</span></div>
        </div>
        <div className="workspace-user"><span>{session.displayName}</span><LogoutButton /></div>
      </header>
      <section>
        <p className="eyebrow">{currentArea}</p>
        <h1>{definition.label}</h1>
        <p>{definition.description}</p>
        <div className="workspace-boundary">
          <ShieldBoundary />
          <div><strong>Authenticated role boundary active</strong><span>This landing route is protected by proxy and server permission checks. Domain workflows remain deliberately outside this identity step.</span></div>
        </div>
      </section>
    </main>
  );
}

function ShieldBoundary() {
  return <span aria-hidden="true" className="workspace-shield">✓</span>;
}
