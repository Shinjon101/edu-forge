"use server";

import { getClassroomById } from "./getClassroomById";
import { openai } from "@/lib/openai";

export async function generateQuestion(prompt: string, classroomId: string) {
  if (!prompt || !classroomId) {
    throw new Error("Prompt and Classroom ID are required");
  }

  const classroom = await getClassroomById(classroomId);

  if (!classroom) {
    throw new Error("Classroom not found");
  }

  const board = classroom.board;
  const grade = classroom.grade;

  const systemPrompt = `You are a A.I teacher's assistant responsible for generating
  questions for class ${grade} of ${board} board. Generate questions according to the
  instructions in the prompt:
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const responseText = completion.choices[0]?.message?.content ?? "";

  if (!responseText) {
    throw new Error("mising A.I response");
  }

  return responseText;
}
