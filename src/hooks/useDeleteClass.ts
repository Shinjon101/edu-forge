"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass } from "../../actions/manageClass";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteClass(classId: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => await deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["created-classes"] });
      queryClient.invalidateQueries({ queryKey: ["classroom", classId] });
      router.push("/");
      toast.success("Class deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to delete class");
    },
  });
}
