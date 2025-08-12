"use client";

import { useActiveTasks } from "@/hooks/useActiveTasks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ActiveTasksList({ classID }: { classID: string }) {
  const { data: tasks, isLoading, error } = useActiveTasks(classID);
  const router = useRouter();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">Failed to load tasks</p>;
  if (!tasks?.length) return <p>No active tasks 🎉</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Button
          key={task.id}
          variant="outline"
          className="w-full flex justify-between"
          onClick={() => router.push(`/classroom/${classID}/task/${task.id}`)}
        >
          <span>{task.title}</span>
          {task.deadline && (
            <span className="text-sm text-muted-foreground">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
