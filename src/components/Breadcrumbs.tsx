"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

import { useClassroom } from "@/hooks/useClassroom";
import { useTask } from "@/hooks/useTask";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const classroomId = segments[1];
  const { data: classroom, isLoading: classroomLoading } = useClassroom(
    classroomId ?? ""
  );

  const taskId = segments[2] === "task" && segments[3] ? segments[3] : null;
  const { data: task, isLoading: taskLoading } = useTask(taskId);

  if (pathname === "/") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1">
        <BreadcrumbItem className="max-w-[50px] truncate md:max-w-[150px]">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments[0] === "classroom" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="max-w-[50px] truncate md:max-w-[150px]">
              {classroomLoading ? (
                <Skeleton className="h-4 w-20 bg-muted" />
              ) : (
                <BreadcrumbLink asChild className="block truncate">
                  <Link href={`/classroom/${classroomId}`}>
                    {classroom?.name ?? "Classroom"}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}

        {segments[2] === "create-task" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="truncate max-w-[50px] md:max-w-[150px]">
                Create Task
              </span>
            </BreadcrumbItem>
          </>
        )}

        {segments[2] === "task" && taskId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="max-w-[60px] truncate md:max-w-[150px]">
              {taskLoading ? (
                <Skeleton className="h-4 w-24 bg-muted" />
              ) : (
                <BreadcrumbLink asChild className="block truncate">
                  <Link href={`/classroom/${classroomId}/task/${taskId}`}>
                    {task?.title ?? "Task"}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
