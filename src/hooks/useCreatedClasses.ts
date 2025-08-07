"use client";

import { useQuery } from "@tanstack/react-query";
import { getCreatedClasses } from "../../actions/getCreatedClasses";

export const useCreatedClasses = () => {
  return useQuery({
    queryKey: ["created-classes"],
    queryFn: async () => await getCreatedClasses(),
  });
};
