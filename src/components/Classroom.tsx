"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { ActiveTasksList } from "./ActiveTaskList";

interface Props {
  role: string;
  classId: string;
}

export default function ClassroomPage({ role, classId }: Props) {
  const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Classroom:</h1>

      {role === "teacher" ? (
        <>
          <p className="mb-6 text-muted-foreground">
            Welcome to your classroom dashboard. You can start by adding a new
            task.
          </p>
          <Button
            onClick={() => router.push(`/classroom/${classId}/create-task`)}
          >
            Add Task
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">Student dashboard scaffold...</p>
      )}
      <div className="mt-10">
        <ActiveTasksList classID={classId} />
      </div>
    </div>
  );
}
