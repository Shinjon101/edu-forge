import React from "react";
import { Skeleton } from "../../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-secondary">
      <div className="md:hidden">
        <Skeleton className="h-8 w-8 bg-muted" />
      </div>
      <section className="flex items-center gap-5">
        <Skeleton className="h-8 w-10 bg-muted" />
        <Skeleton className="h-8 w-8 rounded-full bg-muted" />
      </section>
    </header>
  );
};

export default HeaderSkeleton;
