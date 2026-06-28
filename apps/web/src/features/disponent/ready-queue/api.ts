"use client";

import { createApiClient } from "@/lib/api/client";
import { createSessionAwareApiAdapter } from "@/lib/api/browser-adapter";
import type { ReadyQueueResponse } from "@/features/disponent/ready-queue/types";

const readyQueueResource = createApiClient(createSessionAwareApiAdapter()).disponent;

export function getReadyQueue(signal?: AbortSignal): Promise<ReadyQueueResponse> {
  return readyQueueResource.query<ReadyQueueResponse>("/ready-queue", signal);
}
