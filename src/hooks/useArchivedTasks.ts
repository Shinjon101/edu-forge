// src/hooks/useArchivedTasks.ts
import { useQuery } from "@tanstack/react-query";
import { getArchivedTasks } from "../../actions/getArchivedTasks";

export function useArchivedTasks(classroomId: string) {
  return useQuery({
    queryKey: ["archivedTasks", classroomId],
    queryFn: () => getArchivedTasks(classroomId),
    enabled: !!classroomId,
  });
}
