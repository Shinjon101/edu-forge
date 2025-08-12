import { TaskDeatailPage } from "@/pages/TaskDetailPage";

export default function TaskPage({ params }: { params: { taskId: string } }) {
  return <TaskDeatailPage taskId={params.taskId} />;
}
