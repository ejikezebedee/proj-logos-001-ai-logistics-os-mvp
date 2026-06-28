import { ReadyQueueScreen } from "@/features/disponent/ready-queue/ready-queue-screen";
import { requirePermission } from "@/lib/auth/session";

export default async function ReadyQueuePage() {
  await requirePermission("disponent:queue:view");
  return <ReadyQueueScreen />;
}
