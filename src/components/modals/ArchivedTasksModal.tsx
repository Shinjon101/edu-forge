"use client";

import { useState } from "react";
import { useArchivedTasks } from "@/hooks/useArchivedTasks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Archive } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DeleteTaskButton } from "./DeleteTaskModal";
import { ActiveTasksListSkeleton } from "../skeletons/lists/TaskListSkeletons";

export function ArchivedTasksModal({ classroomId }: { classroomId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { data: tasks, isLoading } = useArchivedTasks(classroomId);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Archive className="w-4 h-4" />
        Archived Tasks
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Archived Tasks</DialogTitle>
          </DialogHeader>

          {isLoading && <ActiveTasksListSkeleton count={3} />}
          {!isLoading && (!tasks || tasks.length === 0) && (
            <p className="text-sm text-muted-foreground text-center">
              No archived tasks found.
            </p>
          )}

          {!isLoading && tasks && tasks.length > 0 && (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-center gap-2 p-2"
                >
                  <Button
                    variant="outline"
                    className="max-w-[200px] md:max-w-xs"
                    onClick={() => {
                      setOpen(false);
                      router.push(`/classroom/${classroomId}/task/${task.id}`);
                    }}
                  >
                    <span className="truncate">{task.title}</span>
                    {task.deadline && (
                      <span className="ml-2 text-sm text-muted-foreground shrink-0">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </Button>
                  {user?.id === task.created_by && (
                    <DeleteTaskButton
                      classroomId={classroomId}
                      taskId={task.id}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
