import { db } from "@/db";
import { tasks } from "@/db/schema";
import { lte, and, eq } from "drizzle-orm";

export async function archiveExpiredTasksForClassroom(classroomId?: string) {
  const now = new Date();

  let whereCondition = and(lte(tasks.deadline, now), eq(tasks.archived, false));

  if (classroomId) {
    whereCondition = and(whereCondition, eq(tasks.classroom_id, classroomId));
  }

  const result = await db
    .update(tasks)
    .set({ archived: true })
    .where(whereCondition);

  return result;
}
