import React from "react";
import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-secondary">
      <Skeleton className="h-8 w-32 bg-muted" />

      <section className="flex items-center gap-5">
        {/* User button/Sign in button skeleton */}
        <Skeleton className="h-8 w-8 rounded-full bg-muted" />
      </section>
    </header>
  );
};

export default HeaderSkeleton;
