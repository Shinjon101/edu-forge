"use client";

import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../actions/getTask";

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => await getTask(taskId),
    enabled: !!taskId,
  });
};
