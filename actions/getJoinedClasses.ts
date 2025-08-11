"use server";

import { db } from "@/db";
import { classrooms, classroomMembers } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

export async function getJoinedClasses() {
  const user = await currentUser();
  if (!user) return [];

  const joined = await db
    .select({
      id: classrooms.id,
      name: classrooms.name,
    })
    .from(classroomMembers)
    .innerJoin(classrooms, eq(classroomMembers.classroom_id, classrooms.id))
    .where(
      and(
        eq(classroomMembers.user_id, user.id),
        eq(classroomMembers.role, "student")
      )
    );

  return joined;
}
