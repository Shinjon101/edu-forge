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
            <DialogTitle>Archived Tasks</DialogTitle>
          </DialogHeader>

          {isLoading && <ActiveTasksListSkeleton count={3} />}
          {!isLoading && (!tasks || tasks.length === 0) && (
            <p className="text-sm text-muted-foreground">
              No archived tasks found.
            </p>
          )}

          {!isLoading && tasks && tasks.length > 0 && (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-center gap-2 flex-nowrap p-2"
                >
                  <Button
                    key={task.id}
                    variant="outline"
                    className="w-full flex justify-between"
                    onClick={() => {
                      setOpen(false);
                      router.push(`/classroom/${classroomId}/task/${task.id}`);
                    }}
                  >
                    <span>{task.title}</span>
                    {task.deadline && (
                      <span className="text-sm text-muted-foreground">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </Button>
                  {user?.id === task.created_by && (
                    <DeleteTaskButton
                      classroomId={classroomId}
                      taskId={task.id}
                      key={task.id + "del"}
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
