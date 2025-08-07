import { useMutation } from "@tanstack/react-query";
import { generateQuestion } from "../../actions/generateQuestions";

export function useGenerateQuestions(classroomId: string) {
  return useMutation({
    mutationFn: (prompt: string) => generateQuestion(prompt, classroomId),
  });
}
