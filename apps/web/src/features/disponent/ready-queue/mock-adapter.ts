import type { ReadyQueueAdapter, ReadyQueueShipment } from "@/features/disponent/ready-queue/types";

export const mockReadyQueueShipments: readonly ReadyQueueShipment[] = [
  {
    id: "shp_1048", shipmentReference: "SHP-1048", orderReference: "ORD-7842", status: "ready_for_dispatch",
    priority: "urgent", risk: "high", readiness: "ready", readinessReason: "All warehouse release checks passed.",
    pickupWindowStart: "2026-06-28T08:30:00.000Z", pickupWindowEnd: "2026-06-28T09:30:00.000Z", serviceLevel: "Same-day industrial",
    customer: { name: "Nordwerk Assembly", reference: "CUS-231" }, merchant: { name: "Korie Components", reference: "MER-018" },
    origin: { label: "Berlin East Fulfilment", city: "Berlin", zone: "BER-E" }, destination: { label: "Nordwerk Plant 4", city: "Potsdam", zone: "PDM-N" },
    package: { count: 4, totalWeightKg: 186.5, cargoType: "Machine components", handlingNotes: "Keep dry; palletized." },
    warehouse: { name: "Berlin East Fulfilment", stagingLane: "D-04", scanComplete: true, documentsReady: true },
    route: { distanceKm: 43, estimatedMinutes: 58, planningState: "not_planned" },
    eligibility: {
      driver: { state: "eligible", eligibleCount: 3, reason: "Three qualified drivers are available in-zone." },
      vehicle: { state: "eligible", eligibleCount: 2, reason: "Two vehicles satisfy payload and cargo constraints." },
      carrier: { state: "review_required", eligibleCount: null, reason: "Carrier capacity endpoint is not connected." },
    },
  },
  {
    id: "shp_1052", shipmentReference: "SHP-1052", orderReference: "ORD-7851", status: "ready_for_dispatch",
    priority: "high", risk: "critical", readiness: "review_required", readinessReason: "Release documents require Disponent review.",
    pickupWindowStart: "2026-06-28T09:00:00.000Z", pickupWindowEnd: "2026-06-28T10:15:00.000Z", serviceLevel: "Express controlled",
    customer: { name: "Havel Medical Systems", reference: "CUS-044" }, merchant: { name: "MediChain Supply", reference: "MER-203" },
    origin: { label: "Berlin East Fulfilment", city: "Berlin", zone: "BER-E" }, destination: { label: "Havel Clinical Depot", city: "Brandenburg", zone: "BRB-C" },
    package: { count: 2, totalWeightKg: 42.2, cargoType: "Medical equipment", handlingNotes: "Temperature monitoring required." },
    warehouse: { name: "Berlin East Fulfilment", stagingLane: "C-11", scanComplete: true, documentsReady: false },
    route: { distanceKm: 71, estimatedMinutes: 82, planningState: "not_planned" },
    eligibility: {
      driver: { state: "review_required", eligibleCount: 1, reason: "Qualification match requires document confirmation." },
      vehicle: { state: "eligible", eligibleCount: 1, reason: "One temperature-monitored vehicle is available." },
      carrier: { state: "unknown", eligibleCount: null, reason: "Carrier eligibility has not been requested." },
    },
  },
  {
    id: "shp_1061", shipmentReference: "SHP-1061", orderReference: "ORD-7860", status: "ready_for_dispatch",
    priority: "standard", risk: "low", readiness: "ready", readinessReason: "All warehouse release checks passed.",
    pickupWindowStart: "2026-06-28T10:30:00.000Z", pickupWindowEnd: "2026-06-28T12:00:00.000Z", serviceLevel: "Scheduled",
    customer: { name: "Spree Retail Labs", reference: "CUS-792" }, merchant: { name: "Urban Rack GmbH", reference: "MER-330" },
    origin: { label: "Tempelhof Cross-dock", city: "Berlin", zone: "BER-S" }, destination: { label: "Spree Retail Labs", city: "Berlin", zone: "BER-C" },
    package: { count: 8, totalWeightKg: 96, cargoType: "Retail fixtures", handlingNotes: null },
    warehouse: { name: "Tempelhof Cross-dock", stagingLane: "A-02", scanComplete: true, documentsReady: true },
    route: { distanceKm: 18, estimatedMinutes: 35, planningState: "draft" },
    eligibility: {
      driver: { state: "eligible", eligibleCount: 6, reason: "Six drivers satisfy current availability rules." },
      vehicle: { state: "eligible", eligibleCount: 4, reason: "Four vehicles satisfy payload constraints." },
      carrier: { state: "unknown", eligibleCount: null, reason: "Carrier is not required for this lane." },
    },
  },
  {
    id: "shp_1064", shipmentReference: "SHP-1064", orderReference: "ORD-7864", status: "ready_for_dispatch",
    priority: "high", risk: "medium", readiness: "blocked", readinessReason: "Final package scan is incomplete.",
    pickupWindowStart: "2026-06-28T11:15:00.000Z", pickupWindowEnd: "2026-06-28T12:15:00.000Z", serviceLevel: "Express",
    customer: { name: "Oder Energy Works", reference: "CUS-118" }, merchant: { name: "Korie Components", reference: "MER-018" },
    origin: { label: "Frankfurt Oder Hub", city: "Frankfurt (Oder)", zone: "FFO" }, destination: { label: "Oder Energy Works", city: "Eisenhüttenstadt", zone: "LOS-S" },
    package: { count: 3, totalWeightKg: 224, cargoType: "Electrical assemblies", handlingNotes: "Forklift required." },
    warehouse: { name: "Frankfurt Oder Hub", stagingLane: "HOLD-2", scanComplete: false, documentsReady: true },
    route: { distanceKm: null, estimatedMinutes: null, planningState: "not_planned" },
    eligibility: {
      driver: { state: "unknown", eligibleCount: null, reason: "Eligibility is deferred until readiness clears." },
      vehicle: { state: "unknown", eligibleCount: null, reason: "Eligibility is deferred until readiness clears." },
      carrier: { state: "unknown", eligibleCount: null, reason: "Eligibility is deferred until readiness clears." },
    },
  },
];

export function createMockReadyQueueAdapter(): ReadyQueueAdapter {
  return {
    async list() {
      return { shipments: mockReadyQueueShipments, refreshedAt: new Date().toISOString(), source: "mock" };
    },
  };
}
