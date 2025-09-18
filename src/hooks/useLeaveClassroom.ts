import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leaveClassroom } from "../../actions/leaveClassroom";

export const useLeaveClassroom = (classroomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      await leaveClassroom(classroomId, studentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classMembers", classroomId],
      });

      queryClient.invalidateQueries({
        queryKey: ["joined-classes"],
      });

      toast.success("Left Class successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to leave class");
    },
  });
};
