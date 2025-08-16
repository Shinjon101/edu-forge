import { useMutation } from "@tanstack/react-query";
import { publishTask } from "../../actions/publishTask";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function usePublishTask(classroomId: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      title,
      rawText,
      deadline,
    }: {
      title: string;
      rawText: string;
      deadline?: Date;
    }) => publishTask(classroomId, title, rawText, deadline),
    onSuccess: () => {
      router.push(`/classroom/${classroomId}`);
      toast.success("Task published successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to publish task");
    },
  });
}
