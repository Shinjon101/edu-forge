"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TaskDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <Skeleton className="h-8 w-40 md:h-10 md:w-64 mb-5" />

        <div className="flex gap-2 mb-5 md:justify-center md:items-center md:mb-0">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" /> {/* Arrow */}
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <ScrollArea className="h-[400px] md:h-fit border rounded-lg p-4 space-y-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
