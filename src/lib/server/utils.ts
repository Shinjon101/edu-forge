import { db } from "@/db";
import { classrooms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function generateClassCode() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0,1,I,O for clarity
  let code = "";
  let exists = true;

  while (exists) {
    code = Array.from(
      { length: 4 },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");

    const check = await db
      .select()
      .from(classrooms)
      .where(eq(classrooms.code, code));

    exists = check.length > 0;
  }

  return code;
}
