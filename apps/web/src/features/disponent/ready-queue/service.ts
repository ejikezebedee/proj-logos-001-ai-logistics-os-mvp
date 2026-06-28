import "server-only";

import { createMockReadyQueueAdapter } from "@/features/disponent/ready-queue/mock-adapter";
import { createBackendReadyQueueAdapter } from "@/features/disponent/ready-queue/production-adapter";
import type { ReadyQueueAdapter } from "@/features/disponent/ready-queue/types";

export function createReadyQueueService(accessToken: string | undefined): ReadyQueueAdapter {
  if (process.env.API_MODE === "mock" || process.env.NODE_ENV === "test") {
    return createMockReadyQueueAdapter();
  }
  const baseUrl = process.env.BACKEND_API_BASE_URL;
  if (!baseUrl) throw new Error("BACKEND_API_BASE_URL is required when API_MODE is production.");
  if (!accessToken) throw new Error("An authenticated backend access token is required.");
  return createBackendReadyQueueAdapter(baseUrl, accessToken);
}
