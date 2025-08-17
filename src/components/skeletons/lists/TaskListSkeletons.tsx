"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count: number;
}

export function ActiveTasksListSkeleton({ count }: Props) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 flex-wrap sm:flex-nowrap"
        >
          <Skeleton className="h-8 flex-1 min-w-0 rounded-md" />

          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      ))}
    </div>
  );
}
