"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { OperationalState } from "@/components/feedback/operational-state";
import { getReadyQueue } from "@/features/disponent/ready-queue/api";
import { ReadyQueueWorkspace } from "@/features/disponent/ready-queue/ready-queue-workspace";

export function ReadyQueueScreen() {
  const query = useQuery({
    queryKey: ["disponent", "ready-queue"],
    queryFn: ({ signal }) => getReadyQueue(signal),
  });

  if (query.isPending) {
    return <OperationalState kind="loading" title="Loading ready queue" description="Checking warehouse readiness and dispatch candidates." />;
  }
  if (query.isError) {
    return (
      <OperationalState
        kind="error"
        title="Ready queue unavailable"
        description="No queue state has been inferred. Retry the adapter request or check the API connection."
        action={<button className="secondary-button" onClick={() => void query.refetch()}><RefreshCw size={14} />Retry</button>}
      />
    );
  }

  return (
    <ReadyQueueWorkspace
      response={query.data}
      refreshing={query.isFetching}
      onRefresh={() => void query.refetch()}
    />
  );
}
