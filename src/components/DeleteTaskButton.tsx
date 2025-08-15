"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTask } from "../hooks/useDeleteTasks";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Props {
  taskId: string;
  classroomId: string;
}

export function DeleteTaskButton({ taskId, classroomId }: Props) {
  const { mutate, isPending } = useDeleteTask(classroomId);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    mutate(taskId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild variant="destructive" size="sm">
        <DialogTrigger>
          <Trash2 />
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Delete Task?</DialogTitle>
          <DialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the task.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
