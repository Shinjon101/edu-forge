import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClassroom } from "../../actions/createClassroom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateClassroom() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      grade: string;
      board: string;
    }) => {
      const res = await createClassroom(input);
      if (!res.success) throw new Error(res.reason);
      return res;
    },
    onSuccess: ({ classroomId }) => {
      toast.success("Classroom created");
      router.push(`/classroom/${classroomId}`);
      queryClient.invalidateQueries({ queryKey: ["created-classes"] });
      queryClient.invalidateQueries({ queryKey: ["classroom", classroomId] });
    },
    onError: (err) => {
      toast.error("Failed to create classroom");
      console.error(err);
    },
  });
}
