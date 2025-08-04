"use server";

import { db } from "@/db";
import { classrooms } from "@/db/schema";
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

  const inserted = await db
    .insert(classrooms)
    .values({
      id: uuidv4(),
      name,
      grade,
      board,
      code,
      created_by: user.id,
    })
    .returning({ id: classrooms.id });

  return { success: true, classroomId: inserted[0].id };
}
