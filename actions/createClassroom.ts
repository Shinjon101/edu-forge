"use server";

import { db } from "@/db";
import { classrooms, classroomMembers } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { generateClassCode } from "@/lib/server/utils";
import { v4 as uuidv4 } from "uuid";

export async function createClassroom({
  grade,
  board,
  name,
}: {
  grade: string;
  board: string;
  name: string;
}) {
  const user = await currentUser();
  if (!user) {
    return { success: false, reason: "not_logged_in" };
  }

  const code = await generateClassCode();
  const classroomId = uuidv4();

  const inserted = await db
    .insert(classrooms)
    .values({
      id: classroomId,
      name,
      grade,
      board,
      code,
      created_by: user.id,
    })
    .returning({ id: classrooms.id });

  await db.insert(classroomMembers).values({
    classroom_id: classroomId,
    user_id: user.id,
    role: "teacher",
  });

  return { success: true, classroomId: inserted[0].id };
}
