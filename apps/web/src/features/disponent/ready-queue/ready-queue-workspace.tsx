"use client";

import { Eye, RefreshCw, Route, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { CommandBar } from "@/components/operations/command-bar";
import { ConfirmationDialog } from "@/components/operations/confirmation-dialog";
import { FilterBar, FilterField } from "@/components/operations/filter-bar";
import { OperationalTable } from "@/components/operations/operational-table";
import { StatusBadge, type StatusTone } from "@/components/operations/status-badge";
import { OperationalState } from "@/components/feedback/operational-state";
import { filterAndSortReadyQueue } from "@/features/disponent/ready-queue/filter";
import { ShipmentDetail } from "@/features/disponent/ready-queue/shipment-detail";
import {
  defaultQueueFilters,
  priorities,
  readinessStates,
  riskLevels,
  type QueueFilters,
  type ReadyQueueResponse,
  type ReadyQueueShipment,
} from "@/features/disponent/ready-queue/types";

const priorityTone: Record<ReadyQueueShipment["priority"], StatusTone> = { standard: "neutral", high: "warning", urgent: "danger" };
const riskTone: Record<ReadyQueueShipment["risk"], StatusTone> = { low: "success", medium: "info", high: "warning", critical: "danger" };
const readinessTone: Record<ReadyQueueShipment["readiness"], StatusTone> = { ready: "success", review_required: "warning", blocked: "danger" };

function formatWindow(start: string, end: string): string {
  const formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
  return `${formatter.format(new Date(start))}–${formatter.format(new Date(end))}`;
}

export function ReadyQueueWorkspace({
  onRefresh,
  refreshing,
  response,
}: {
  onRefresh: () => void;
  refreshing: boolean;
  response: ReadyQueueResponse;
}) {
  const [filters, setFilters] = useState<QueueFilters>(defaultQueueFilters);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<ReadyQueueShipment | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const shipments = filterAndSortReadyQueue(response.shipments, filters);
  const zones = [...new Set(response.shipments.map((shipment) => shipment.origin.zone))].sort();
  const allVisibleSelected = shipments.length > 0 && shipments.every((shipment) => selectedIds.has(shipment.id));

  function updateFilter<Key extends keyof QueueFilters>(key: Key, value: QueueFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleVisible() {
    setSelectedIds((current) => {
      const next = new Set(current);
      shipments.forEach((shipment) => allVisibleSelected ? next.delete(shipment.id) : next.add(shipment.id));
      return next;
    });
  }

  return (
    <>
      <header className="page-heading queue-heading">
        <div>
          <p className="eyebrow">Transport control / dispatch intake</p>
          <h1>Ready-for-dispatch queue</h1>
          <p>Verify warehouse release, operational risk, and resource eligibility before shipments enter tour planning.</p>
        </div>
        <div className="queue-sync-state">
          <StatusBadge tone={response.source === "mock" ? "warning" : "success"}>{response.source} adapter</StatusBadge>
          <span>Updated {new Date(response.refreshedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </header>

      <FilterBar>
        <FilterField label="Search">
          <span className="filter-search"><Search size={14} /><input value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="Shipment, order, party or city" /></span>
        </FilterField>
        <FilterField label="Origin zone"><select value={filters.zone} onChange={(event) => updateFilter("zone", event.target.value)}><option value="all">All zones</option>{zones.map((zone) => <option key={zone}>{zone}</option>)}</select></FilterField>
        <FilterField label="Priority"><select value={filters.priority} onChange={(event) => updateFilter("priority", event.target.value as QueueFilters["priority"])}><option value="all">All priorities</option>{priorities.map((value) => <option key={value}>{value}</option>)}</select></FilterField>
        <FilterField label="Risk"><select value={filters.risk} onChange={(event) => updateFilter("risk", event.target.value as QueueFilters["risk"])}><option value="all">All risk levels</option>{riskLevels.map((value) => <option key={value}>{value}</option>)}</select></FilterField>
        <FilterField label="Readiness"><select value={filters.readiness} onChange={(event) => updateFilter("readiness", event.target.value as QueueFilters["readiness"])}><option value="all">All readiness</option>{readinessStates.map((value) => <option key={value}>{value.replace("_", " ")}</option>)}</select></FilterField>
        <FilterField label="Sort"><select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value as QueueFilters["sort"])}><option value="pickup_asc">Pickup window</option><option value="priority_desc">Priority high first</option><option value="risk_desc">Risk high first</option><option value="reference_asc">Shipment reference</option></select></FilterField>
        <div className="filter-actions">
          <button className="secondary-button" onClick={() => setFilters(defaultQueueFilters)}>Clear filters</button>
          <button className="secondary-button" onClick={onRefresh} disabled={refreshing}><RefreshCw className={refreshing ? "spin" : ""} size={14} />{refreshing ? "Refreshing" : "Refresh"}</button>
        </div>
      </FilterBar>

      <CommandBar selectionCount={selectedIds.size}>
        <button className="secondary-button" disabled={selectedIds.size === 0} title={selectedIds.size === 0 ? "Select at least one shipment before clearing the working selection." : undefined} onClick={() => setConfirmClear(true)}><Trash2 size={14} />Clear selection</button>
        <span className="blocked-action">
          <button className="primary-button" disabled title="Tour-plan creation is blocked until its command contract and audit reason workflow are connected."><Route size={15} />Create tour plan</button>
          <small>Blocked: tour-plan command contract not connected.</small>
        </span>
      </CommandBar>

      <section className="queue-table-panel" aria-label="Ready shipments">
        <div className="queue-count"><strong>{shipments.length}</strong> of {response.shipments.length} shipments shown</div>
        {response.shipments.length === 0 ? (
          <OperationalState kind="empty" title="No ready shipments" description="No warehouse-released shipments are currently available for dispatch planning." />
        ) : shipments.length === 0 ? (
          <OperationalState kind="empty" title="No filter matches" description="Adjust or clear the queue filters to see dispatch candidates." action={<button className="secondary-button" onClick={() => setFilters(defaultQueueFilters)}>Clear filters</button>} />
        ) : (
          <OperationalTable
            caption="Ready-for-dispatch shipments"
            head={<tr><th className="select-cell"><input type="checkbox" aria-label="Select all visible shipments" checked={allVisibleSelected} onChange={toggleVisible} /></th><th>Shipment</th><th>Window / zone</th><th>Parties</th><th>Load</th><th>Priority</th><th>Risk</th><th>Readiness</th><th><span className="sr-only">Actions</span></th></tr>}
          >
            {shipments.map((shipment) => (
              <tr key={shipment.id} className={selectedIds.has(shipment.id) ? "row-selected" : undefined}>
                <td className="select-cell"><input type="checkbox" aria-label={`Select ${shipment.shipmentReference}`} checked={selectedIds.has(shipment.id)} onChange={() => toggleSelection(shipment.id)} /></td>
                <td><strong>{shipment.shipmentReference}</strong><span>{shipment.orderReference}</span></td>
                <td><strong>{formatWindow(shipment.pickupWindowStart, shipment.pickupWindowEnd)}</strong><span>{shipment.origin.zone} → {shipment.destination.zone}</span></td>
                <td><strong>{shipment.customer.name}</strong><span>{shipment.merchant.name}</span></td>
                <td><strong>{shipment.package.count} packages</strong><span>{shipment.package.totalWeightKg} kg</span></td>
                <td><StatusBadge tone={priorityTone[shipment.priority]}>{shipment.priority}</StatusBadge></td>
                <td><StatusBadge tone={riskTone[shipment.risk]}>{shipment.risk}</StatusBadge></td>
                <td><StatusBadge tone={readinessTone[shipment.readiness]}>{shipment.readiness.replace("_", " ")}</StatusBadge><span className="readiness-reason">{shipment.readinessReason}</span></td>
                <td><button className="table-action" onClick={() => setDetail(shipment)} aria-label={`Open details for ${shipment.shipmentReference}`}><Eye size={15} />Details</button></td>
              </tr>
            ))}
          </OperationalTable>
        )}
      </section>

      <ShipmentDetail shipment={detail} onClose={() => setDetail(null)} />
      <ConfirmationDialog
        open={confirmClear}
        title="Clear the current selection?"
        description={`This removes ${selectedIds.size} selected shipments from the working selection. Shipment records are not changed.`}
        confirmLabel="Clear selection"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => { setSelectedIds(new Set()); setConfirmClear(false); }}
      />
    </>
  );
}
