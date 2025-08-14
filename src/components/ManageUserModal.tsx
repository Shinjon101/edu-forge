"use client";

import { useState } from "react";
import { useClassMembers } from "@/hooks/useClassMembers";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { RemoveStudentButton } from "./RemoveStudentButton";

interface Props {
  classId: string;
  currentUserRole: string;
}

export function ManageUserModal({ classId, currentUserRole }: Props) {
  const [open, setOpen] = useState(false);
  const { data: members, isLoading } = useClassMembers(classId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <Users className="h-4 w-4" />
          Members
        </DialogTrigger>
      </Button>

      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Class Members</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading members...</p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {members?.map((member) => (
              <div
                key={member.userId}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border p-2 rounded gap-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {member.name || member.email}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {member.role}
                  </span>
                </div>

                {currentUserRole === "teacher" && member.role === "student" && (
                  <RemoveStudentButton
                    classId={classId}
                    studentId={member.userId}
                    studentName={member.name}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
