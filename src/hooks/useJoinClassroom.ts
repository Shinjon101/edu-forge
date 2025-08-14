import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinClassroom } from "../../actions/joinClassroom";

export function useJoinClassroom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await joinClassroom(code);
      if (!res.success) {
        throw new Error(res.reason);
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["joined-classes"],
      });
    },
  });
}
