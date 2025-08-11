"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { classroomMembers, classrooms } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function checkMembership(classroomId: string) {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  const classroom = await db.query.classrooms.findFirst({
    where: eq(classrooms.id, classroomId),
  });

  if (!classroom) {
    notFound();
  }

  const member = await db.query.classroomMembers.findFirst({
    columns: {
      role: true,
    },
    where: and(
      eq(classroomMembers.classroom_id, classroomId),
      eq(classroomMembers.user_id, userId)
    ),
  });

  if (!member) {
    notFound();
  }

  return { access: "member", role: member.role };
}
