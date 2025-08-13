import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeStudent } from "../../actions/classroomMemberActions"; // your server action

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
    },
  });
};
