"use server";

import { getClassroomById } from "./getClassroomById";
import { openai } from "@/lib/openai";

function cleanAIResponse(text: string): string {
  // Remove triple backticks (markdown code block)
  const noCodeBlocks = text.replace(/```[\s\S]*?```/g, "");

  // Remove any JSON-like object structure accidentally returned
  const noJSON = noCodeBlocks.replace(/^{[\s\S]*}$/gm, "");

  // Remove markdown-like "json" wrapping (```json ... ```)
  const cleaned = noJSON.replace(/```json([\s\S]*?)```/g, "$1");

  return cleaned.trim();
}

export async function generateQuestion(
  prompt: string,
  classroomId: string
): Promise<string> {
  if (!prompt || !classroomId) {
    throw new Error("Prompt and Classroom ID are required");
  }

  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new Error("Classroom not found");
  }

  const systemPrompt = `You are an A.I. assistant helping a teacher of class ${classroom.grade} in the ${classroom.board} board.

Generate a list of questions based on the user's prompt. The questions should be:
- Suitable for the given grade and board
- Well-formatted and clearly written
- Either plain text or include LaTeX for math expressions (e.g. \\( \\frac{3}{4} \\) or $$x^2 + y^2 = z^2$$)
- Separated by line breaks or numbered (but no JSON or code blocks)

Do not explain anything. Only return the list of questions. In plain text`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const rawResponse = completion.choices[0]?.message?.content ?? "";
  const cleanedResponse = cleanAIResponse(rawResponse);

  return cleanedResponse;
}
