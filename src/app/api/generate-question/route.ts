import { NextRequest, NextResponse } from "next/server";
import { getClassroomById } from "../../../../actions/getClassroomById";
import { openai } from "@/lib/openai";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");
  const classroomId = searchParams.get("classroomId");

  if (!prompt || !classroomId) {
    return NextResponse.json(
      { error: "Missing prompt or classroomId" },
      { status: 400 }
    );
  }

  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    return NextResponse.json({ error: "Classroom not found" }, { status: 404 });
  }

  const systemPrompt = `You are an A.I teacher's assistant responsible for generating
questions for class ${classroom.grade} of ${classroom.board} board. Generate questions according to the
instructions in the prompt:`;

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const text = completion.choices[0]?.message?.content ?? "";

  return NextResponse.json({ result: text });
}
