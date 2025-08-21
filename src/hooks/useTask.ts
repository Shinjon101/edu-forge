"use client";

import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../actions/getTask";

export const useTask = (taskId: string | null) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => await getTask(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
