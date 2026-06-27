"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { AuthField, FormAlert } from "@/components/auth/auth-fields";
import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/auth-context";
import { fieldErrors, verifyTwoFactorSchema, type FieldErrors } from "@/features/auth/schemas";

export function TwoFactorForm() {
  const router = useRouter();
  const { completeAuthentication } = useAuth();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = verifyTwoFactorSchema.safeParse({ code: new FormData(event.currentTarget).get("code") });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setMessage(undefined);
    setSubmitting(true);
    try {
      const response = await authApi.verifyTwoFactor(result.data.code);
      if (response.status !== "authenticated") throw new Error("Verification was not completed.");
      completeAuthentication(response.session);
      router.replace(response.redirectTo);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Verification could not be completed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-heading">
        <p className="eyebrow">Second factor</p>
        <h2>Verify your access</h2>
        <p>Enter the six-digit code from your approved authenticator or verification channel.</p>
      </div>
      <form className="auth-form" noValidate onSubmit={submit}>
        <FormAlert>{message}</FormAlert>
        <AuthField
          autoComplete="one-time-code"
          error={errors.code}
          inputMode="numeric"
          label="Verification code"
          maxLength={6}
          name="code"
          pattern="[0-9]{6}"
          placeholder="000000"
          required
        />
        <button className="auth-submit" disabled={submitting} type="submit">
          {submitting ? <><LoaderCircle className="spin" size={17} />Verifying</> : <><ShieldCheck size={17} />Verify and continue</>}
        </button>
      </form>
      <p className="auth-card-footer">Challenge missing or expired? <Link href="/login">Start again</Link></p>
    </div>
  );
}
