"use client";

import { ApiError } from "@/lib/api/errors";
import {
  createProductionApiAdapter,
  type ApiAdapter,
  type ApiRequest,
} from "@/lib/api/adapter";

export function createSessionAwareApiAdapter(baseUrl = "/api"): ApiAdapter {
  const adapter = createProductionApiAdapter(baseUrl);
  return {
    async request<TResponse, TBody = unknown>(request: ApiRequest<TBody>): Promise<TResponse> {
      try {
        return await adapter.request<TResponse, TBody>(request);
      } catch (error) {
        const isAuthRequest = request.group === "auth";
        if (!(error instanceof ApiError) || error.status !== 401 || isAuthRequest) throw error;
        const refreshed = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
        if (!refreshed.ok) {
          window.location.assign("/session-expired");
          throw error;
        }
        return adapter.request<TResponse, TBody>(request);
      }
    },
  };
}
