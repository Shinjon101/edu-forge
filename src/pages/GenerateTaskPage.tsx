"use client";

import { useState, useTransition } from "react";
import { generateQuestion } from "../../actions/generate-questions";
import { useParams } from "next/navigation";

export default function GenerateTaskPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const classroomId = params?.id as string;

  console.log(params);

  const handleGenerate = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await generateQuestion(input, classroomId);
        setResponse(res);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter a prompt to generate questions"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={isPending}
      >
        {isPending ? "Generating..." : "Generate"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {response && (
        <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {response}
        </div>
      )}
    </div>
  );
}
