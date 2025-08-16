"use client";

import { useEffect, useState } from "react";
import { useUpdateClassName } from "@/hooks/useUpdateClassName";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DeleteClassModal } from "./DeleteClassModal";

export function EditClassroomModal({
  classId,
  currentName,
}: {
  classId: string;
  currentName: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const { mutateAsync, isPending } = useUpdateClassName();

  useEffect(() => {
    if (currentName) {
      setName(currentName);
    }
  }, [currentName]);

  const handleSave = async () => {
    await mutateAsync({ classId, newName: name });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Pencil size={16} />
      </DialogTrigger>

      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle className="text-left">Update Class Name</DialogTitle>
        </DialogHeader>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new class name"
        />

        <DialogFooter className="flex flex-row justify-end md:flex">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>

        <DialogHeader className="mt-4">
          <DialogTitle className="text-left">Delete Class</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will <b>permanently delete </b>
          the classroom, it's tasks and remove all the memebers.
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-end md:flex ">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <DeleteClassModal classId={classId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
