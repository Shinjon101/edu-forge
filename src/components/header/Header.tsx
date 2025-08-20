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
import HeaderSkeleton from "../skeletons/lists/HeaderSkeleton";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import SideBar from "../sidebar/SideBar";
import Breadcrumbs from "../Breadcrumbs";

const Header = () => {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  if (!isLoaded) return <HeaderSkeleton />;
  return (
    <header className="flex items-center justify-between p-3 bg-secondary">
      {/* Left section */}
      <div className="flex items-center">
        <div className="md:hidden mt-1">
          <SideBar />
        </div>
      </div>

      {/* Center section */}
      <div className="absolute left-1/2 -translate-x-1/2 mr-2">
        <Breadcrumbs />
      </div>

      {/* Right section */}
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
