import { CheckCircle2, CircleAlert, CircleHelp, Truck } from "lucide-react";
import { DetailDrawer } from "@/components/operations/detail-drawer";
import { StatusBadge, type StatusTone } from "@/components/operations/status-badge";
import type { EligibilitySummary, ReadyQueueShipment } from "@/features/disponent/ready-queue/types";

const eligibilityTone: Record<EligibilitySummary["state"], StatusTone> = {
  eligible: "success", review_required: "warning", unavailable: "danger", unknown: "neutral",
};

function EligibilityCard({ label, summary }: { label: string; summary: EligibilitySummary }) {
  const Icon = summary.state === "eligible" ? CheckCircle2 : summary.state === "unknown" ? CircleHelp : CircleAlert;
  return (
    <article className="eligibility-card">
      <div><Icon aria-hidden="true" size={16} /><strong>{label}</strong></div>
      <StatusBadge tone={eligibilityTone[summary.state]}>{summary.state.replace("_", " ")}</StatusBadge>
      <p>{summary.reason}</p>
      <span>{summary.eligibleCount === null ? "Count unavailable" : `${summary.eligibleCount} eligible`}</span>
    </article>
  );
}

function DetailPair({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="detail-pair"><dt>{label}</dt><dd>{value}</dd></div>;
}

export function ShipmentDetail({ shipment, onClose }: { shipment: ReadyQueueShipment | null; onClose: () => void }) {
  return (
    <DetailDrawer open={shipment !== null} onClose={onClose} title={shipment?.shipmentReference ?? "Shipment"}>
      {shipment && (
        <div className="shipment-detail-content">
          <section>
            <h3>Package and warehouse readiness</h3>
            <dl className="detail-grid">
              <DetailPair label="Packages" value={`${shipment.package.count} / ${shipment.package.totalWeightKg} kg`} />
              <DetailPair label="Cargo" value={shipment.package.cargoType} />
              <DetailPair label="Warehouse" value={shipment.warehouse.name} />
              <DetailPair label="Staging lane" value={shipment.warehouse.stagingLane} />
              <DetailPair label="Package scan" value={shipment.warehouse.scanComplete ? "Complete" : "Incomplete"} />
              <DetailPair label="Release documents" value={shipment.warehouse.documentsReady ? "Ready" : "Review required"} />
            </dl>
            {shipment.package.handlingNotes && <p className="detail-note">Handling: {shipment.package.handlingNotes}</p>}
          </section>
          <section>
            <h3>Customer, merchant and route</h3>
            <dl className="detail-grid">
              <DetailPair label="Customer" value={`${shipment.customer.name} · ${shipment.customer.reference}`} />
              <DetailPair label="Merchant" value={`${shipment.merchant.name} · ${shipment.merchant.reference}`} />
              <DetailPair label="Origin" value={`${shipment.origin.label}, ${shipment.origin.city}`} />
              <DetailPair label="Destination" value={`${shipment.destination.label}, ${shipment.destination.city}`} />
              <DetailPair label="Route estimate" value={shipment.route.distanceKm === null ? "Not calculated" : `${shipment.route.distanceKm} km / ${shipment.route.estimatedMinutes} min`} />
              <DetailPair label="Planning state" value={shipment.route.planningState.replace("_", " ")} />
            </dl>
          </section>
          <section>
            <h3>Resource eligibility</h3>
            <div className="eligibility-grid">
              <EligibilityCard label="Drivers" summary={shipment.eligibility.driver} />
              <EligibilityCard label="Vehicles" summary={shipment.eligibility.vehicle} />
              <EligibilityCard label="Carriers" summary={shipment.eligibility.carrier} />
            </div>
          </section>
          <section className="drawer-actions">
            <button className="primary-button" disabled title="Assignment commands are blocked until the backend eligibility and assignment contracts are connected.">
              <Truck size={15} />Assign resources
            </button>
            <p>Disabled: assignment and eligibility command contracts are not connected.</p>
          </section>
        </div>
      )}
    </DetailDrawer>
  );
}
