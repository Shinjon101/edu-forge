"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";

export const getCreatedClasses = async () => {
  const { userId } = await auth();
  if (!userId) return [];

  const classes = await db.query.classrooms.findMany({
    where: (cls, { eq }) => eq(cls.created_by, userId),
    orderBy: (cls, { desc }) => [desc(cls.created_at)],
  });

  return classes;
};
