"use client";

import { useQuery } from "@tanstack/react-query";
import { getCreatedClasses } from "../../actions/get-created-classes";

export const useCreatedClasses = () => {
  return useQuery({
    queryKey: ["created-classes"],
    queryFn: async () => await getCreatedClasses(),
  });
};
