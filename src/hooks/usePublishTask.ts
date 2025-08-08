import { useMutation } from "@tanstack/react-query";
import { publishTask } from "../../actions/publishTask";
import { useRouter } from "next/navigation";

export function usePublishTask(classroomId: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ title, rawText }: { title: string; rawText: string }) =>
      publishTask(classroomId, title, rawText),
    onSuccess: () => router.push(`/classroom/${classroomId}`),
  });
}
