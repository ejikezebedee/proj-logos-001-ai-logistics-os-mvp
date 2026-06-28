export const priorities = ["standard", "high", "urgent"] as const;
export type ShipmentPriority = (typeof priorities)[number];

export const riskLevels = ["low", "medium", "high", "critical"] as const;
export type RiskLevel = (typeof riskLevels)[number];

export const readinessStates = ["ready", "review_required", "blocked"] as const;
export type ReadinessState = (typeof readinessStates)[number];

export type EligibilityState = "eligible" | "review_required" | "unavailable" | "unknown";

export interface QueueParty {
  readonly name: string;
  readonly reference: string;
}

export interface QueueLocation {
  readonly label: string;
  readonly city: string;
  readonly zone: string;
}

export interface EligibilitySummary {
  readonly state: EligibilityState;
  readonly eligibleCount: number | null;
  readonly reason: string;
}

export interface ReadyQueueShipment {
  readonly id: string;
  readonly shipmentReference: string;
  readonly orderReference: string;
  readonly status: "ready_for_dispatch";
  readonly priority: ShipmentPriority;
  readonly risk: RiskLevel;
  readonly readiness: ReadinessState;
  readonly readinessReason: string;
  readonly pickupWindowStart: string;
  readonly pickupWindowEnd: string;
  readonly serviceLevel: string;
  readonly customer: QueueParty;
  readonly merchant: QueueParty;
  readonly origin: QueueLocation;
  readonly destination: QueueLocation;
  readonly package: {
    readonly count: number;
    readonly totalWeightKg: number;
    readonly cargoType: string;
    readonly handlingNotes: string | null;
  };
  readonly warehouse: {
    readonly name: string;
    readonly stagingLane: string;
    readonly scanComplete: boolean;
    readonly documentsReady: boolean;
  };
  readonly route: {
    readonly distanceKm: number | null;
    readonly estimatedMinutes: number | null;
    readonly planningState: "not_planned" | "draft";
  };
  readonly eligibility: {
    readonly driver: EligibilitySummary;
    readonly vehicle: EligibilitySummary;
    readonly carrier: EligibilitySummary;
  };
}

export interface ReadyQueueResponse {
  readonly shipments: readonly ReadyQueueShipment[];
  readonly refreshedAt: string;
  readonly source: "mock" | "production";
}

export interface ReadyQueueAdapter {
  list(signal?: AbortSignal): Promise<ReadyQueueResponse>;
}

export type QueueSort = "pickup_asc" | "priority_desc" | "risk_desc" | "reference_asc";

export interface QueueFilters {
  readonly query: string;
  readonly zone: string;
  readonly priority: ShipmentPriority | "all";
  readonly risk: RiskLevel | "all";
  readonly readiness: ReadinessState | "all";
  readonly sort: QueueSort;
}

export const defaultQueueFilters: QueueFilters = {
  query: "",
  zone: "all",
  priority: "all",
  risk: "all",
  readiness: "all",
  sort: "pickup_asc",
};
