import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStudent } from "../../actions/classroomMemberActions";
import { toast } from "sonner";

export const useRemoveStudent = (classroomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      await removeStudent(classroomId, studentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classMembers", classroomId],
      });
      toast.success("Removed student successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to remove student");
    },
  });
};
