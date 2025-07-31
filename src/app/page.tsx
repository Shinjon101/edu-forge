"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="">
      <div className="flex mt-2">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {user && <h1 className="font-bold">Hi {user?.firstName}</h1>}
      </div>
    </main>
  );
}
