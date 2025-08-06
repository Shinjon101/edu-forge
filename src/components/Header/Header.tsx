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
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import SideBar from "../sidebar/SideBar";

const Header = () => {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  if (!isLoaded) return <HeaderSkeleton />;
  return (
    <header className="flex items-center justify-between p-5 bg-secondary">
      <div className="md:hidden">
        <SideBar />
      </div>

      <section className="flex items-center gap-5">
        <Button
          variant="outline"
          onClick={() => setTheme(darkMode ? "light" : "dark")}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>

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
