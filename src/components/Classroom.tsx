"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { ActiveTasksList } from "./ActiveTaskList";
import { ArchivedTasksModal } from "./ArchivedTasksModal";
import { useClassroom } from "@/hooks/useClassroom";

interface Props {
  role: string;
  classId: string;
}

export default function ClassroomPage({ role, classId }: Props) {
  const router = useRouter();
  const { data: classroom, isLoading } = useClassroom(classId);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header Row - Mobile first */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">{classroom?.name} Class</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <ArchivedTasksModal classroomId={classId} />
          {role === "teacher" && (
            <Button
              onClick={() => router.push(`/classroom/${classId}/create-task`)}
            >
              Add Task
            </Button>
          )}
        </div>
      </div>

      {/* Task List Section */}
      <div className="mt-10">
        <h2 className="font-bold text-2xl mb-5">Tasks:</h2>
        <ActiveTasksList classID={classId} />
      </div>
    </div>
  );
}
