"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";

export async function getActiveTasks(classID: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const now = new Date();

  const results = await db.query.tasks.findMany({
    where: and(eq(tasks.classroom_id, classID), gte(tasks.deadline, now)),
    columns: {
      id: true,
      title: true,
      deadline: true,
      created_by: true,
    },
    orderBy: (tasks, { asc }) => asc(tasks.deadline),
  });

  return results.map((task) => ({
    ...task,
    isOwner: task.created_by === userId,
  }));
}
