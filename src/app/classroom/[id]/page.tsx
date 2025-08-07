"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function ClassroomPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Classroom:</h1>
      <p className="mb-6 text-muted-foreground">
        Welcome to your classroom dashboard. You can start by adding a new task.
      </p>

      <Button
        onClick={() => router.push(`/classroom/${params.id}/create-task`)}
      >
        Add Task
      </Button>
    </div>
  );
}
