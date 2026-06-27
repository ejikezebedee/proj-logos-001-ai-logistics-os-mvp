import { describe, expect, it } from "vitest";
import { errorKindForStatus } from "@/lib/api/errors";

describe("API error normalization", () => {
  it.each([
    [401, "authentication"],
    [403, "authorization"],
    [409, "conflict"],
    [422, "validation"],
    [429, "rate_limit"],
    [501, "not_implemented"],
    [503, "server"],
  ] as const)("maps status %i to %s", (status, kind) => {
    expect(errorKindForStatus(status)).toBe(kind);
  });
});
