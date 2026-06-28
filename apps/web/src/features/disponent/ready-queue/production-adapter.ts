import { z } from "zod";
import { createApiClient } from "@/lib/api/client";
import { createProductionApiAdapter } from "@/lib/api/adapter";
import type { ReadyQueueAdapter } from "@/features/disponent/ready-queue/types";

const partySchema = z.object({ name: z.string(), reference: z.string() });
const locationSchema = z.object({ label: z.string(), city: z.string(), zone: z.string() });
const eligibilitySchema = z.object({
  state: z.enum(["eligible", "review_required", "unavailable", "unknown"]),
  eligibleCount: z.number().int().nonnegative().nullable(),
  reason: z.string(),
});
const shipmentSchema = z.object({
  id: z.string(), shipmentReference: z.string(), orderReference: z.string(), status: z.literal("ready_for_dispatch"),
  priority: z.enum(["standard", "high", "urgent"]), risk: z.enum(["low", "medium", "high", "critical"]),
  readiness: z.enum(["ready", "review_required", "blocked"]), readinessReason: z.string(),
  pickupWindowStart: z.iso.datetime(), pickupWindowEnd: z.iso.datetime(), serviceLevel: z.string(),
  customer: partySchema, merchant: partySchema, origin: locationSchema, destination: locationSchema,
  package: z.object({ count: z.number().int().positive(), totalWeightKg: z.number().nonnegative(), cargoType: z.string(), handlingNotes: z.string().nullable() }),
  warehouse: z.object({ name: z.string(), stagingLane: z.string(), scanComplete: z.boolean(), documentsReady: z.boolean() }),
  route: z.object({ distanceKm: z.number().nonnegative().nullable(), estimatedMinutes: z.number().int().nonnegative().nullable(), planningState: z.enum(["not_planned", "draft"]) }),
  eligibility: z.object({ driver: eligibilitySchema, vehicle: eligibilitySchema, carrier: eligibilitySchema }),
});
const responseSchema = z.object({ shipments: z.array(shipmentSchema), refreshedAt: z.iso.datetime() });

export function createBackendReadyQueueAdapter(baseUrl: string, accessToken: string): ReadyQueueAdapter {
  const client = createApiClient(createProductionApiAdapter(baseUrl, { accessToken })).disponent;
  return {
    async list(signal) {
      const response = await client.query<unknown>("/ready-queue", signal);
      const parsed = responseSchema.parse(response);
      return { ...parsed, source: "production" };
    },
  };
}
