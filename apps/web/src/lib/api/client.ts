import type { ApiAdapter, ApiGroup, ApiRequest } from "@/lib/api/adapter";

export interface ApiResourceClient {
  query<TResponse>(path?: string, signal?: AbortSignal): Promise<TResponse>;
  command<TResponse, TBody>(request: Omit<ApiRequest<TBody>, "group">): Promise<TResponse>;
}

function resource(adapter: ApiAdapter, group: ApiGroup): ApiResourceClient {
  return {
    query: <TResponse>(path = "", signal?: AbortSignal) =>
      adapter.request<TResponse>({ group, path, method: "GET", signal }),
    command: <TResponse, TBody>(request: Omit<ApiRequest<TBody>, "group">) =>
      adapter.request<TResponse, TBody>({ ...request, group }),
  };
}

export function createApiClient(adapter: ApiAdapter) {
  return {
    auth: resource(adapter, "auth"),
    orders: resource(adapter, "orders"),
    shipments: resource(adapter, "shipments"),
    warehouse: resource(adapter, "warehouse"),
    disponent: resource(adapter, "disponent"),
    drivers: resource(adapter, "drivers"),
    tracking: resource(adapter, "tracking"),
    approvals: resource(adapter, "approvals"),
  } as const;
}
