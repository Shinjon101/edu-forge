import { useDeleteClass } from "@/hooks/useDeleteClass";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteClassModal({ classId }: { classId: string }) {
  const { mutate: deleteClass, isPending } = useDeleteClass(classId);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteClass();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Delete Class ?</DialogTitle>
          <DialogDescription className="text-left">
            Are you sure you want to <b>delete this class</b> ?
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
            <Trash2 />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
