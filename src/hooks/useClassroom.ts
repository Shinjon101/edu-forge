"use client";

import { useQuery } from "@tanstack/react-query";
import { getClassroomById } from "../../actions/getClassroomById";

export const useClassroom = (classID: string) => {
  return useQuery({
    queryKey: ["classroom", classID],
    queryFn: async () => await getClassroomById(classID),
    enabled: !!classID,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
