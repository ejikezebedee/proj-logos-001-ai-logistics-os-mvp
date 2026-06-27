export type ApiErrorKind =
  | "validation"
  | "authentication"
  | "authorization"
  | "conflict"
  | "rate_limit"
  | "not_implemented"
  | "network"
  | "server"
  | "unknown";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly kind: ApiErrorKind,
    readonly status?: number,
    readonly correlationId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function errorKindForStatus(status: number): ApiErrorKind {
  if (status === 400 || status === 422) return "validation";
  if (status === 401) return "authentication";
  if (status === 403) return "authorization";
  if (status === 409) return "conflict";
  if (status === 429) return "rate_limit";
  if (status === 501) return "not_implemented";
  if (status >= 500) return "server";
  return "unknown";
}
