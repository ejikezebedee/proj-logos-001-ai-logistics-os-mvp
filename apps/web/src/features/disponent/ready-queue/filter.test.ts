import { describe, expect, it } from "vitest";
import { filterAndSortReadyQueue } from "@/features/disponent/ready-queue/filter";
import { mockReadyQueueShipments } from "@/features/disponent/ready-queue/mock-adapter";
import { defaultQueueFilters } from "@/features/disponent/ready-queue/types";

describe("ready queue filtering", () => {
  it("combines zone, risk, and free-text filters", () => {
    const result = filterAndSortReadyQueue(mockReadyQueueShipments, {
      ...defaultQueueFilters,
      query: "medical",
      zone: "BER-E",
      risk: "critical",
    });
    expect(result.map((shipment) => shipment.shipmentReference)).toEqual(["SHP-1052"]);
  });

  it("sorts highest operational risk first", () => {
    const result = filterAndSortReadyQueue(mockReadyQueueShipments, {
      ...defaultQueueFilters,
      sort: "risk_desc",
    });
    expect(result.map((shipment) => shipment.risk)).toEqual(["critical", "high", "medium", "low"]);
  });

  it("returns no records when filters do not match", () => {
    expect(filterAndSortReadyQueue(mockReadyQueueShipments, {
      ...defaultQueueFilters,
      query: "missing-shipment",
    })).toEqual([]);
  });
});
