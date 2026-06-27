"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, LoaderCircle, Send } from "lucide-react";
import { AuthField, FormAlert } from "@/components/auth/auth-fields";
import { authApi } from "@/features/auth/api";
import { fieldErrors, forgotPasswordSchema, type FieldErrors } from "@/features/auth/schemas";

export function ForgotPasswordForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = forgotPasswordSchema.safeParse({ email: form.get("email") });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await authApi.forgotPassword(result.data.email);
      setSubmitted(true);
      setMessage("If the account exists, password-reset instructions have been sent.");
    } catch {
      setSubmitted(true);
      setMessage("If the account exists, password-reset instructions have been sent.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-heading">
        <p className="eyebrow">Account recovery</p>
        <h2>Reset your password</h2>
        <p>Enter your account email. The response remains private whether or not an account exists.</p>
      </div>
      <form className="auth-form" noValidate onSubmit={submit}>
        <FormAlert kind="success">{submitted ? message : undefined}</FormAlert>
        <AuthField autoComplete="email" error={errors.email} label="Account email" name="email" required type="email" />
        <button className="auth-submit" disabled={submitting || submitted} type="submit">
          {submitting ? <><LoaderCircle className="spin" size={17} />Submitting</> : <><Send size={17} />Send reset instructions</>}
        </button>
      </form>
      <p className="auth-card-footer"><Link href="/login"><ArrowLeft size={14} />Return to sign in</Link></p>
    </div>
  );
}
