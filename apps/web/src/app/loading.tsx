import { OperationalState } from "@/components/feedback/operational-state";

export default function Loading() {
  return <div className="state-page"><OperationalState kind="loading" title="Loading operational context" description="Checking the active role and command-center state." /></div>;
}
