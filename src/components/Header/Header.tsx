"use client";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import HeaderSkeleton from "./HeaderSkeleton";

const Header = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <HeaderSkeleton />;
  return (
    <header className="flex items-center justify-between p-5 bg-secondary">
      {user && <h1 className="tex-2xl font-bold">{user?.firstName}</h1>}

      <section className="flex items-center gap-5">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </section>
    </header>
  );
};

export default Header;
