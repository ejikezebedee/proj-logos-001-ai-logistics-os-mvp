import { AlertTriangle, CheckCircle2, LoaderCircle, PackageOpen, ShieldX } from "lucide-react";
import type { ReactNode } from "react";

const icons = {
  loading: LoaderCircle,
  empty: PackageOpen,
  error: AlertTriangle,
  success: CheckCircle2,
  denied: ShieldX,
} as const;

export function OperationalState({
  kind,
  title,
  description,
  action,
}: {
  kind: keyof typeof icons;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  const Icon = icons[kind];
  return (
    <section className="operational-state" role={kind === "error" ? "alert" : "status"}>
      <Icon aria-hidden="true" className={kind === "loading" ? "spin" : ""} size={22} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </section>
  );
}
