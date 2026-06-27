import { Boxes, BrainCircuit, Route, ShieldCheck } from "lucide-react";
import { OperationalState } from "@/components/feedback/operational-state";

const flows = [
  { icon: Boxes, label: "Goods flow", detail: "Package location and readiness" },
  { icon: Route, label: "Information flow", detail: "State, route, and next action" },
  { icon: BrainCircuit, label: "Decision flow", detail: "Governed AI recommendations" },
  { icon: ShieldCheck, label: "Responsibility", detail: "Custody, permissions, and audit" },
];

export default function DisponentFoundationPage() {
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Transport control / foundation</p>
          <h1>Disponent command center</h1>
          <p>The first-class planning and exception workspace for industrial logistics operations.</p>
        </div>
        <span className="foundation-badge">Foundation verified</span>
      </header>

      <section className="flow-grid" aria-label="Operational control model">
        {flows.map(({ icon: Icon, label, detail }) => (
          <article className="flow-card" key={label}>
            <Icon aria-hidden="true" size={19} />
            <div><strong>{label}</strong><span>{detail}</span></div>
          </article>
        ))}
      </section>

      <section className="workspace-grid">
        <div className="workspace-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">Operational workspace</p><h2>Ready-for-dispatch queue</h2></div>
            <span className="status-chip">Adapter required</span>
          </div>
          <OperationalState
            kind="empty"
            title="No operational data requested"
            description="The queue route, permission, and API boundary are defined. Shipment data will load only after the backend contract or an explicit mock handler is connected."
          />
        </div>

        <aside className="workspace-panel control-panel">
          <p className="eyebrow">Foundation controls</p>
          <h2>Connected architecture</h2>
          <ul className="control-list">
            <li><span>Role and permission registry</span><strong>Active</strong></li>
            <li><span>Production/mock API boundary</span><strong>Active</strong></li>
            <li><span>Query and mutation policy</span><strong>Active</strong></li>
            <li><span>Live event transport</span><em>Not configured</em></li>
            <li><span>OpenAPI contract</span><em>Not provided</em></li>
          </ul>
        </aside>
      </section>
    </>
  );
}
