"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getArchivedTasks(classroomId: string) {
  if (!classroomId) {
    throw new Error("classroomId is required");
  }

  const result = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.classroom_id, classroomId), eq(tasks.archived, true)))
    .orderBy(tasks.deadline);

  return result;
}
