"use server";

import { db } from "@/db";
import { classroomMembers, classrooms } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function teacherCheck(classId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherCheck = await db.query.classroomMembers.findFirst({
    where: and(
      eq(classroomMembers.classroom_id, classId),
      eq(classroomMembers.user_id, userId),
      eq(classroomMembers.role, "teacher")
    ),
  });

  return teacherCheck;
}

export async function updateName(classId: string, newName: string | undefined) {
  const teacher = await teacherCheck(classId);
  if (!teacher) throw new Error("Permission denied");

  if (!newName) throw new Error("New Name not found");

  const [updated] = await db
    .update(classrooms)
    .set({ name: newName })
    .where(eq(classrooms.id, classId))
    .returning();

  if (!updated) throw new Error("Classroom not found");

  return updated;
}
export async function deleteClass(classId: string) {
  const teacher = await teacherCheck(classId);
  if (!teacher) throw new Error("Permission denied");

  await db.delete(classrooms).where(eq(classrooms.id, classId));

  return { success: true };
}
