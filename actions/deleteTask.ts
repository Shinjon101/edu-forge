"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function deleteTask(taskId: string) {
  const user = await currentUser();
  if (!user) throw new Error("not_logged_in");

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });

  if (!task) throw new Error("task_not_found");
  if (task.created_by !== user.id) throw new Error("unauthorized");

  await db.delete(tasks).where(eq(tasks.id, taskId));

  return { success: true };
}
