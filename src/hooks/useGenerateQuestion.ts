import { useQuery } from "@tanstack/react-query";

export function useGenerateQuestions(prompt: string, classroomId: string) {
  return useQuery({
    queryKey: ["generate-questions", prompt, classroomId],
    queryFn: async () => {
      const res = await fetch(
        `/api/generate-question?prompt=${encodeURIComponent(
          prompt
        )}&classroomId=${classroomId}`
      );
      if (!res.ok) throw new Error("Failed to generate questions");
      const data = await res.json();
      return data.result;
    },
    enabled: !!prompt && !!classroomId,
  });
}
