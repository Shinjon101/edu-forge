"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuestionsForTask } from "../../actions/getQuestionsForTask";

export function useGetQuestionsForTask(taskId: string) {
  return useQuery({
    queryKey: ["questions", taskId],
    queryFn: () => getQuestionsForTask(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
