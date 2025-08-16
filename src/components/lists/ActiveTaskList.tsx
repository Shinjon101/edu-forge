"use client";

import { useActiveTasks } from "@/hooks/useActiveTasks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { DeleteTaskButton } from "../DeleteTaskButton";

export function ActiveTasksList({ classID }: { classID: string }) {
  const { data: tasks, isLoading, error } = useActiveTasks(classID);
  const router = useRouter();
  const { user } = useUser();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">Failed to load tasks</p>;
  if (!tasks?.length) return <p>No active tasks 🎉</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-2 flex-wrap sm:flex-nowrap"
        >
          <Button
            variant="outline"
            className="flex-1 min-w-0 flex justify-between items-center"
            onClick={() => router.push(`/classroom/${classID}/task/${task.id}`)}
          >
            <span className="truncate max-w-[70%]">{task.title}</span>
            {task.deadline && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
          </Button>

          {user?.id === task.created_by && (
            <DeleteTaskButton
              classroomId={classID}
              taskId={task.id}
              key={task.id + "del"}
            />
          )}
        </div>
      ))}
    </div>
  );
}
