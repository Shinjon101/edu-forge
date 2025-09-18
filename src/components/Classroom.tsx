"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { ActiveTasksList } from "./lists/ActiveTaskList";
import { ArchivedTasksModal } from "./modals/ArchivedTasksModal";
import { useClassroom } from "@/hooks/useClassroom";
import { ManageUserModal } from "./modals/ManageUserModal";
import InviteModal from "./modals/InviteModal";
import { EditClassroomModal } from "./modals/EditClassroomModal";
import { Skeleton } from "./ui/skeleton";
import { LeaveClassroomModal } from "./modals/LeaveClassroomModal";
import { useAuth } from "@clerk/nextjs";

interface Props {
  role: string;
  classId: string;
  userId: string;
}

export default function ClassroomPage({ role, classId, userId }: Props) {
  const router = useRouter();
  const { data: classroom, isLoading } = useClassroom(classId);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3 mb-4 md:flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          {isLoading ? (
            <Skeleton className="h-10 w-48 rounded-md" />
          ) : (
            <h1 className="text-3xl font-bold">{classroom?.name}</h1>
          )}
          {role === "teacher" && (
            <EditClassroomModal
              classId={classId}
              currentName={classroom?.name}
            />
          )}
        </div>
        <div className="flex flex-row gap-2">
          {role === "teacher" && (
            <>
              <Button
                onClick={() => router.push(`/classroom/${classId}/create-task`)}
              >
                Add Task
              </Button>

              <InviteModal classId={classId} />
            </>
          )}

          <ManageUserModal classId={classId} currentUserRole={role} />

          {role !== "teacher" && (
            <LeaveClassroomModal classId={classId} studentId={userId} />
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl mb-5">Tasks:</h2>
          <ArchivedTasksModal classroomId={classId} />
        </div>

        <ActiveTasksList classID={classId} />
      </div>
    </div>
  );
}
