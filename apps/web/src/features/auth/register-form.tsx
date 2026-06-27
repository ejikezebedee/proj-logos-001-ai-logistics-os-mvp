"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { AuthField, FormAlert, PasswordField } from "@/components/auth/auth-fields";
import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/auth-context";
import { fieldErrors, registerSchema, type FieldErrors } from "@/features/auth/schemas";

export function RegisterForm() {
  const router = useRouter();
  const { completeAuthentication } = useAuth();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = registerSchema.safeParse({
      displayName: form.get("displayName"),
      organizationName: form.get("organizationName"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
      acceptTerms: form.get("acceptTerms") === "on",
    });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      setMessage("Review the highlighted registration fields.");
      return;
    }

    setErrors({});
    setMessage(undefined);
    setSubmitting(true);
    try {
      const response = await authApi.register(result.data);
      if (response.status !== "authenticated") throw new Error("Registration requires an unsupported challenge.");
      completeAuthentication(response.session);
      router.replace(response.redirectTo);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration could not be completed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card auth-card-wide">
      <div className="auth-card-heading">
        <p className="eyebrow">Customer onboarding</p>
        <h2>Create an account</h2>
        <p>Registration creates customer portal access. Operational roles are assigned by authorized administrators.</p>
      </div>
      <form className="auth-form" noValidate onSubmit={submit}>
        <FormAlert>{message}</FormAlert>
        <div className="field-grid">
          <AuthField autoComplete="name" error={errors.displayName} label="Full name" name="displayName" required />
          <AuthField autoComplete="organization" error={errors.organizationName} label="Organization" name="organizationName" required />
        </div>
        <AuthField autoComplete="email" error={errors.email} label="Email" name="email" required type="email" />
        <div className="field-grid">
          <PasswordField autoComplete="new-password" error={errors.password} hint="8–128 characters" label="Password" name="password" required />
          <PasswordField autoComplete="new-password" error={errors.confirmPassword} label="Confirm password" name="confirmPassword" required />
        </div>
        <label className="check-field check-field-block">
          <input aria-invalid={Boolean(errors.acceptTerms)} name="acceptTerms" type="checkbox" />
          <span>I accept the platform access, privacy, and responsible-use terms.</span>
        </label>
        {errors.acceptTerms && <p className="field-error checkbox-error">{errors.acceptTerms}</p>}
        <button className="auth-submit" disabled={submitting} type="submit">
          {submitting ? <><LoaderCircle className="spin" size={17} />Creating access</> : <>Create customer access<ArrowRight size={17} /></>}
        </button>
      </form>
      <p className="auth-card-footer">Already registered? <Link href="/login">Sign in</Link></p>
    </div>
  );
}
