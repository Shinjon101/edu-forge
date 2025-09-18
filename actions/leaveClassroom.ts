"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { classroomMembers, classrooms, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function leaveClassroom(classId: string, studentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const studentCheck = await db.query.classroomMembers.findFirst({
    where: and(
      eq(classroomMembers.classroom_id, classId),
      eq(classroomMembers.user_id, userId)
    ),
  });

  if (!studentCheck) throw new Error("Permission denied");

  await db
    .delete(classroomMembers)
    .where(
      and(
        eq(classroomMembers.classroom_id, classId),
        eq(classroomMembers.user_id, studentId)
      )
    );

  return { success: true };
}
