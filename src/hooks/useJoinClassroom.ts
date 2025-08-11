"use client";

import { useMutation } from "@tanstack/react-query";
import { joinClassroom } from "../../actions/joinClassroom";

export function useJoinClassroom() {
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await joinClassroom(code);
      if (!res.success) {
        throw new Error(res.reason);
      }
      return res;
    },
  });
}
