"use client";

import { OperationalState } from "@/components/feedback/operational-state";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="state-page">
      <OperationalState
        kind="error"
        title="Operational surface unavailable"
        description="The shell could not load safely. Retry the request; no operational action was submitted."
        action={<button className="primary-button" onClick={reset}>Retry</button>}
      />
    </div>
  );
}
