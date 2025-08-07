"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function addUser() {
  const user = await currentUser();
  if (!user) {
    return { success: false, reason: "missing_clerk_user" };
  }

  await db
    .insert(users)
    .values({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName || user.username || user.lastName || "Anonymous",
    })
    .onConflictDoNothing();

  return { success: true };
}
