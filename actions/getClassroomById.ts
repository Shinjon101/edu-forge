"use server";

import { db } from "@/db";
import { classrooms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getClassroomById(classroomId: string) {
  if (!classroomId) throw new Error("Missing classroom ID");

  const result = await db
    .select()
    .from(classrooms)
    .where(eq(classrooms.id, classroomId))
    .limit(1);

  return result[0] ?? null;
}
