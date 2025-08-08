"use server";

import { db } from "@/db";
import { tasks, questions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function publishTask(
  classroomId: string,
  title: string,
  rawText: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be signed in to publish a task.");

  if (!classroomId || !title.trim() || !rawText.trim()) {
    throw new Error("Missing required fields: classroomId, title, rawText");
  }

  const taskId = uuidv4();

  await db.insert(tasks).values({
    id: taskId,
    classroom_id: classroomId,
    created_by: userId,
    title: title.trim(),
    content: rawText.trim(),
  });

  const questionList = rawText
    .split("\n")
    .map((q) => q.trim())
    .filter(Boolean);

  if (questionList.length) {
    await db.insert(questions).values(
      questionList.map((q) => ({
        task_id: taskId,
        content: q,
      }))
    );
  }
  revalidatePath(`/classroom/${classroomId}`);
  return { success: true, taskId };
}
