import { useMutation } from "@tanstack/react-query";
import { generateQuestion } from "../../actions/generate-questions";

export function useGenerateQuestions(classroomId: string) {
  return useMutation({
    mutationFn: (prompt: string) => generateQuestion(prompt, classroomId),
  });
}
