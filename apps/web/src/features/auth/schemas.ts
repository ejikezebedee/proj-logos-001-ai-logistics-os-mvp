import { z } from "zod";

const email = z.string().trim().email("Enter a valid email address.").max(254);
const password = z.string().min(8, "Use at least 8 characters.").max(128);

export const loginSchema = z.object({
  email,
  password,
  remember: z.boolean(),
});

export const registerSchema = z.object({
  displayName: z.string().trim().min(2, "Enter your full name.").max(100),
  organizationName: z.string().trim().min(2, "Enter your organization name.").max(120),
  email,
  password,
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { error: "Confirm that you accept the access and privacy terms." }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export const forgotPasswordSchema = z.object({ email });

export const verifyTwoFactorSchema = z.object({
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit verification code."),
});

export type FieldErrors = Record<string, string | undefined>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  return error.issues.reduce<FieldErrors>((errors, issue) => {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    return errors;
  }, {});
}
