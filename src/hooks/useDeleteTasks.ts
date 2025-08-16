import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../actions/deleteTask";
import { toast } from "sonner";

export function useDeleteTask(classID: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTasks", classID] });
      toast.success("Task deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
}
