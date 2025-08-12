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

export function ArchivedTasksModal({ classroomId }: { classroomId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: tasks, isLoading } = useArchivedTasks(classroomId);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Archive className="w-4 h-4" />
        View Archived Tasks
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archived Tasks</DialogTitle>
          </DialogHeader>

          {isLoading && <p>Loading...</p>}
          {!isLoading && (!tasks || tasks.length === 0) && (
            <p className="text-sm text-muted-foreground">
              No archived tasks found.
            </p>
          )}

          {!isLoading && tasks && tasks.length > 0 && (
            <div className="space-y-2">
              {tasks.map((task) => (
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
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
