"use client";

import { OperationalState } from "@/components/feedback/operational-state";

export default function ReadyQueueError({ reset }: { reset: () => void }) {
  return <OperationalState kind="error" title="The ready queue could not open" description="The route failed before queue data was available." action={<button className="secondary-button" onClick={reset}>Retry route</button>} />;
}
