"use client";

import { useQuery } from "@tanstack/react-query";
import { getJoinedClasses } from "../../actions/getJoinedClasses";

export function useJoinedClasses() {
  return useQuery({
    queryKey: ["joined-classes"],
    queryFn: async () => {
      return await getJoinedClasses();
    },
  });
}
