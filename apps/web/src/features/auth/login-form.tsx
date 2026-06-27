"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { AuthField, FormAlert, PasswordField } from "@/components/auth/auth-fields";
import { authApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/auth-context";
import { fieldErrors, loginSchema, type FieldErrors } from "@/features/auth/schemas";

export function LoginForm() {
  const router = useRouter();
  const { completeAuthentication } = useAuth();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
      remember: form.get("remember") === "on",
    });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      setMessage("Review the highlighted fields.");
      return;
    }

    setErrors({});
    setMessage(undefined);
    setSubmitting(true);
    try {
      const response = await authApi.login(result.data);
      if (response.status === "2fa_required") {
        router.push("/verify-2fa");
        return;
      }
      completeAuthentication(response.session);
      router.replace(response.redirectTo);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign-in could not be completed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-heading">
        <p className="eyebrow">Identity check</p>
        <h2>Sign in</h2>
        <p>Use the account assigned to your organization and operating role.</p>
      </div>
      <form className="auth-form" noValidate onSubmit={submit}>
        <FormAlert>{message}</FormAlert>
        <AuthField autoComplete="email" error={errors.email} label="Work email" name="email" placeholder="name@company.com" required type="email" />
        <PasswordField autoComplete="current-password" error={errors.password} label="Password" name="password" required />
        <div className="form-row">
          <label className="check-field"><input name="remember" type="checkbox" /><span>Keep this device signed in</span></label>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        <button className="auth-submit" disabled={submitting} type="submit">
          {submitting ? <><LoaderCircle className="spin" size={17} />Checking access</> : <>Continue securely<ArrowRight size={17} /></>}
        </button>
      </form>
      <p className="auth-card-footer">Need customer access? <Link href="/register">Create an account</Link></p>
    </div>
  );
}
