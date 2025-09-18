import { useState } from "react";
import { useRemoveStudent } from "@/hooks/useRemoveStudent";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLeaveClassroom } from "@/hooks/useLeaveClassroom";
import { useRouter } from "next/navigation";

export function LeaveClassroomModal({
  classId,
  studentId,
}: {
  classId: string;
  studentId: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useLeaveClassroom(classId);
  const router = useRouter();

  const handleRemove = () => {
    mutate(studentId, {
      onSuccess: () => {
        setOpen(false);
        router.push("/");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowLeft />
          Leave
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Classroom</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave this class? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            variant="destructive"
            onClick={handleRemove}
            disabled={isPending}
          >
            {isPending ? "Leaving..." : "Leave"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
