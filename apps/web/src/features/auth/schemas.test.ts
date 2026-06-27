import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema, verifyTwoFactorSchema } from "@/features/auth/schemas";

describe("authentication schemas", () => {
  it("accepts a valid login without changing credentials", () => {
    const result = loginSchema.safeParse({ email: "disponent@company.test", password: "safe-pass-123", remember: true });
    expect(result.success).toBe(true);
  });

  it("rejects short passwords", () => {
    const result = loginSchema.safeParse({ email: "user@company.test", password: "short", remember: false });
    expect(result.success).toBe(false);
  });

  it("requires matching registration passwords and accepted terms", () => {
    const result = registerSchema.safeParse({
      displayName: "Ada Operator",
      organizationName: "North Depot",
      email: "ada@company.test",
      password: "safe-pass-123",
      confirmPassword: "different-pass",
      acceptTerms: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts only six-digit verification codes", () => {
    expect(verifyTwoFactorSchema.safeParse({ code: "246810" }).success).toBe(true);
    expect(verifyTwoFactorSchema.safeParse({ code: "24A810" }).success).toBe(false);
  });
});
