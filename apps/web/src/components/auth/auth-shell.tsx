import { Boxes, KeyRound, Route, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

const assurances = [
  { icon: ShieldCheck, title: "Role-scoped access", detail: "Every workspace and action follows server-verified permissions." },
  { icon: KeyRound, title: "Server-only tokens", detail: "Access and refresh credentials never enter browser storage." },
  { icon: Route, title: "Operational continuity", detail: "Sessions refresh without losing command-center context." },
  { icon: Boxes, title: "Industrial workflow", detail: "Identity is tied to organization, custody, and responsibility." },
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <div className="brand-lockup auth-brand-lockup">
          <span className="brand-mark">L</span>
          <div><strong>LOGOS</strong><span>Logistics operations system</span></div>
        </div>
        <div className="auth-brand-copy">
          <p className="eyebrow">Secure operations access</p>
          <h1>Enter the logistics control plane.</h1>
          <p>One identity boundary for customers, warehouses, drivers, Disponenten, finance, compliance, and system governance.</p>
        </div>
        <div className="auth-assurances">
          {assurances.map(({ icon: Icon, title, detail }) => (
            <article key={title}>
              <Icon aria-hidden="true" size={18} />
              <div><strong>{title}</strong><span>{detail}</span></div>
            </article>
          ))}
        </div>
      </section>
      <section className="auth-form-panel">{children}</section>
    </main>
  );
}
