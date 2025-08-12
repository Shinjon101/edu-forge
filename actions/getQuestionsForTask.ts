"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { questions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getQuestionsForTask(taskId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const result = await db.query.questions.findMany({
    where: eq(questions.task_id, taskId),
    columns: {
      id: true,
      content: true,
    },
    orderBy: (q, { asc }) => [asc(q.id)],
  });

  return result;
}
