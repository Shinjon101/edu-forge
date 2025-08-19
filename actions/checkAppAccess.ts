import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function checkAppAccess() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") ?? [];
  if (!email || !allowedEmails.includes(email)) {
    redirect("/access-denied");
  }
}
