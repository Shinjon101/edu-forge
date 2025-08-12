"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCreatedClasses } from "@/hooks/useCreatedClasses";

export const CreatedClassesList = () => {
  const pathname = usePathname();
  const { data: createdClasses, isLoading, isError } = useCreatedClasses();

  const renderClassLink = (cls: { id: string; name: string }) => {
    const isActive =
      pathname === `/classroom/${cls.id}` || `/classroom/${cls.id}/task/\\`;
    return (
      <Link
        key={cls.id}
        href={`/classroom/${cls.id}`}
        className={`border py-1 rounded-md text-center px-3 max-w-[150px] truncate overflow-hidden ${
          isActive ? "font-bold bg-secondary border-2" : ""
        }`}
      >
        {cls.name}
      </Link>
    );
  };

  return (
    <div className="mt-2 space-y-4 w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center space-y-2">
        <p className="text-xs font-medium text-gray-600">Created by me</p>

        {isLoading && <p className="text-sm text-gray-400">Loading...</p>}

        {isError && (
          <p className="text-sm text-red-500">Failed to load classes.</p>
        )}

        {createdClasses?.length
          ? createdClasses.map(renderClassLink)
          : !isLoading && (
              <p className="text-sm text-gray-400">No classrooms yet.</p>
            )}
      </div>
    </div>
  );
};
