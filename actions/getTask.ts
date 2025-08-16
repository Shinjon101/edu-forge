"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getTask(taskId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const task = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, taskId)),
    columns: {
      id: true,
      title: true,
      deadline: true,
      created_by: true,
      created_at: true,
    },
  });

  return task;
}
