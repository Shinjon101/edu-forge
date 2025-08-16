"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateName } from "../../actions/manageClass";
import { toast } from "sonner";

export function useUpdateClassName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      newName,
    }: {
      classId: string;
      newName: string | undefined;
    }) => {
      return await updateName(classId, newName);
    },
    onSuccess: (_, { classId }) => {
      //toast.success("Class name updated!");
      queryClient.invalidateQueries({ queryKey: ["created-classes"] });
      queryClient.invalidateQueries({ queryKey: ["classroom", classId] });
    },
    onError: (error: any) => {
      //toast.error(error.message || "Failed to update class name");
    },
  });
}
