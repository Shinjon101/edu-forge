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

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const classroomId = segments[1];
  const { data: classroom } = useClassroom(classroomId ?? "");

  const taskId = segments[2] === "task" && segments[3] ? segments[3] : null;
  const { data: task } = useTask(taskId ?? "");

  if (pathname === "/") return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1">
        <BreadcrumbItem className="max-w-[50px] truncate md:max-w-[150px]">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments[0] === "classroom" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="max-w-[50px] truncate md:max-w-[150px]">
              <BreadcrumbLink
                href={`/classroom/${classroomId}`}
                className="block truncate"
              >
                {classroom?.name ?? "Classroom"}
              </BreadcrumbLink>
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
              <BreadcrumbLink
                href={`/classroom/${classroomId}/task/${taskId}`}
                className="block truncate"
              >
                {task?.title ?? "Task"}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
