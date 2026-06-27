"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
}

export function AuthField({ label, error, hint, className, id, ...props }: AuthFieldProps) {
  const inputId = id ?? props.name;
  const descriptionId = `${inputId}-description`;
  return (
    <label className="auth-field" htmlFor={inputId}>
      <span>{label}{props.required && <em aria-hidden="true">Required</em>}</span>
      <input
        {...props}
        aria-describedby={error || hint ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        className={cn(error && "input-error", className)}
        id={inputId}
      />
      {(error || hint) && <small className={error ? "field-error" : undefined} id={descriptionId}>{error ?? hint}</small>}
    </label>
  );
}

export function PasswordField(props: Omit<AuthFieldProps, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-field">
      <AuthField {...props} type={visible ? "text" : "password"} />
      <button
        aria-label={visible ? "Hide password" : "Show password"}
        className="password-toggle"
        onClick={() => setVisible((current) => !current)}
        type="button"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

export function FormAlert({ children, kind = "error" }: { children?: string; kind?: "error" | "success" }) {
  if (!children) return null;
  return <p className={cn("form-alert", kind === "success" && "form-alert-success")} role={kind === "error" ? "alert" : "status"}>{children}</p>;
}
