import type { QueueFilters, ReadyQueueShipment } from "@/features/disponent/ready-queue/types";

const priorityRank = { standard: 0, high: 1, urgent: 2 } as const;
const riskRank = { low: 0, medium: 1, high: 2, critical: 3 } as const;

export function filterAndSortReadyQueue(
  shipments: readonly ReadyQueueShipment[],
  filters: QueueFilters,
): ReadyQueueShipment[] {
  const query = filters.query.trim().toLowerCase();
  const filtered = shipments.filter((shipment) => {
    const searchable = [
      shipment.shipmentReference,
      shipment.orderReference,
      shipment.customer.name,
      shipment.merchant.name,
      shipment.origin.city,
      shipment.destination.city,
    ].join(" ").toLowerCase();
    return (!query || searchable.includes(query))
      && (filters.zone === "all" || shipment.origin.zone === filters.zone)
      && (filters.priority === "all" || shipment.priority === filters.priority)
      && (filters.risk === "all" || shipment.risk === filters.risk)
      && (filters.readiness === "all" || shipment.readiness === filters.readiness);
  });

  return filtered.sort((left, right) => {
    switch (filters.sort) {
      case "priority_desc": return priorityRank[right.priority] - priorityRank[left.priority];
      case "risk_desc": return riskRank[right.risk] - riskRank[left.risk];
      case "reference_asc": return left.shipmentReference.localeCompare(right.shipmentReference);
      case "pickup_asc": return Date.parse(left.pickupWindowStart) - Date.parse(right.pickupWindowStart);
    }
  });
}
