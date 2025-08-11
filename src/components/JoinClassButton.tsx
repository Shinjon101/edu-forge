"use client";

import { useState } from "react";
import { useJoinClassroom } from "@/hooks/useJoinClassroom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export function JoinClassModal({ trigger }: { trigger?: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate, isPending, error } = useJoinClassroom();

  const handleJoin = () => {
    mutate(code.trim().toUpperCase(), {
      onSuccess: (res) => {
        setOpen(false);
        router.push(`/classroom/${res.classroomId}`);
      },
    });
  };

  const errorMap: Record<string, string> = {
    invalid_code: "Invalid classroom code.",
    already_member: "You are already in this classroom.",
    is_teacher: "You are the teacher of this classroom.",
    not_logged_in: "You must be logged in to join a classroom.",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Join Class</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Classroom</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Enter 4-character code"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>
              {errorMap[error.message] || "Something went wrong."}
            </AlertDescription>
          </Alert>
        )}

        <Button
          className="mt-4"
          disabled={isPending || code.length !== 4}
          onClick={handleJoin}
        >
          {isPending ? "Joining..." : "Join"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
