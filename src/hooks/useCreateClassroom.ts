import { useMutation } from "@tanstack/react-query";
import { createClassroom } from "../../actions/createClassroom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateClassroom() {
  const router = useRouter();

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
    },
    onError: (err) => {
      toast.error("Failed to create classroom");
      console.error(err);
    },
  });
}
