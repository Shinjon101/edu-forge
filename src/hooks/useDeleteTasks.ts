import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../actions/deleteTask";

export function useDeleteTask(classID: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTasks", classID] });
    },
  });
}
