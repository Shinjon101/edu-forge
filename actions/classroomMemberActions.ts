"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { classroomMembers, classrooms, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getClassMembers(classId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const members = await db
    .select({
      userId: classroomMembers.user_id,
      role: classroomMembers.role,
      joinedAt: classroomMembers.joined_at,
      name: users.name,
      email: users.email,
    })
    .from(classroomMembers)
    .leftJoin(users, eq(users.id, classroomMembers.user_id))
    .where(eq(classroomMembers.classroom_id, classId));

  return members;
}

export async function removeStudent(classId: string, studentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherCheck = await db.query.classroomMembers.findFirst({
    where: and(
      eq(classroomMembers.classroom_id, classId),
      eq(classroomMembers.user_id, userId),
      eq(classroomMembers.role, "teacher")
    ),
  });

  if (!teacherCheck) throw new Error("Permission denied");

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
