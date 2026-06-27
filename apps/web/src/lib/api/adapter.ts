import { ApiError, errorKindForStatus } from "@/lib/api/errors";

export const apiGroups = [
  "auth", "users", "roles", "merchants", "customers", "warehouse", "inventory",
  "orders", "shipments", "packages", "disponent", "dispatch", "routes", "tracking",
  "drivers", "fleet", "carriers", "payments", "escrow", "ledger", "returns", "disputes",
  "notifications", "ai", "approvals", "audit", "analytics", "admin", "compliance",
] as const;

export type ApiGroup = (typeof apiGroups)[number];
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequest<TBody = unknown> {
  readonly group: ApiGroup;
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly body?: TBody;
  readonly signal?: AbortSignal;
  readonly idempotencyKey?: string;
}

export interface ApiAdapter {
  request<TResponse, TBody = unknown>(request: ApiRequest<TBody>): Promise<TResponse>;
}

export function createProductionApiAdapter(baseUrl: string): ApiAdapter {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return {
    async request<TResponse, TBody = unknown>(request: ApiRequest<TBody>): Promise<TResponse> {
      const response = await fetch(`${normalizedBaseUrl}/${request.group}${request.path ?? ""}`, {
        method: request.method ?? "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(request.idempotencyKey ? { "Idempotency-Key": request.idempotencyKey } : {}),
        },
        body: request.body === undefined ? undefined : JSON.stringify(request.body),
        signal: request.signal,
      }).catch(() => {
        throw new ApiError("The logistics API could not be reached.", "network");
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null) as { message?: unknown } | null;
        const message = typeof errorBody?.message === "string"
          ? errorBody.message
          : `The logistics API returned status ${response.status}.`;
        throw new ApiError(
          message,
          errorKindForStatus(response.status),
          response.status,
          response.headers.get("x-correlation-id") ?? undefined,
        );
      }

      if (response.status === 204) return undefined as TResponse;
      return (await response.json()) as TResponse;
    },
  };
}

export type MockHandler = (request: ApiRequest) => unknown | Promise<unknown>;

export function createMockApiAdapter(handlers: Partial<Record<ApiGroup, MockHandler>> = {}): ApiAdapter {
  return {
    async request<TResponse, TBody = unknown>(request: ApiRequest<TBody>): Promise<TResponse> {
      const handler = handlers[request.group];
      if (!handler) {
        throw new ApiError(
          `No mock handler is registered for /${request.group}.`,
          "not_implemented",
          501,
        );
      }
      return (await handler(request)) as TResponse;
    },
  };
}
