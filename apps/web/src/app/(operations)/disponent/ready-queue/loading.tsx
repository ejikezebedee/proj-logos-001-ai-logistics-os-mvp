import { OperationalState } from "@/components/feedback/operational-state";

export default function ReadyQueueLoading() {
  return <OperationalState kind="loading" title="Opening ready queue" description="Verifying queue access and loading the operational workspace." />;
}
