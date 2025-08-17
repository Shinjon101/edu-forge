import TaskDetailPage from "@/components/TaskDetailPage";
import { checkMembership } from "../../../../../../actions/checkMembership";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string; taskId: string }>;
}) {
  const { id, taskId } = await params;
  await checkMembership(id);
  return <TaskDetailPage taskId={taskId} />;
}
