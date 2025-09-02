import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (e: boolean) => void;
  deadline: Date | undefined;
  setDeadline: (e: Date | undefined) => void;
  confirmPublish: () => void;
  isPublishing: boolean;
}

export default function DeadlineDialog({
  open,
  setOpen,
  deadline,
  setDeadline,
  confirmPublish,
  isPublishing,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="text-center">Set Task Deadline</DialogTitle>
        <div className="flex justify-center items-center py-4 ">
          <Calendar
            mode="single"
            selected={deadline}
            onSelect={setDeadline}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            className="rounded-md border"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmPublish} disabled={isPublishing}>
            {isPublishing && <Loader2 className="animate-spin mr-2" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
