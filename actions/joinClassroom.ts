"use server";

import { db } from "@/db";
import { classrooms, classroomMembers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function joinClassroom(code: string) {
  const user = await currentUser();
  if (!user) {
    return { success: false, reason: "not_logged_in" };
  }

  const found = await db
    .select()
    .from(classrooms)
    .where(eq(classrooms.code, code));

  if (found.length === 0) {
    return { success: false, reason: "invalid_code" };
  }

  const classroomId = found[0].id;

  const existing = await db
    .select()
    .from(classroomMembers)
    .where(
      and(
        eq(classroomMembers.classroom_id, classroomId),
        eq(classroomMembers.user_id, user.id)
      )
    );

  if (existing.length > 0) {
    return { success: false, reason: "already_member" };
  }

  if (found[0].created_by === user.id) {
    return { success: false, reason: "is_teacher" };
  }

  await db.insert(classroomMembers).values({
    classroom_id: classroomId,
    user_id: user.id,
    role: "student",
  });

  return { success: true, classroomId };
}
