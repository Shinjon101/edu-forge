"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass } from "../../actions/manageClass";
import { useRouter } from "next/navigation";

export function useDeleteClass(classId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => await deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["created-classes"] });
      queryClient.invalidateQueries({ queryKey: ["classroom", classId] });

      router.push("/");
    },
  });
}
