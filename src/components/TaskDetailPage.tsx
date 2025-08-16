"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useGetQuestionsForTask } from "../hooks/useGetQuestions";

function TaskDetailPage({ taskId }: { taskId: string }) {
  const { data: questions, isLoading } = useGetQuestionsForTask(taskId);

  const renderLine = (line: string, index: number) => {
    const parts = line.split(/(\\\(.+?\\\))/g);
    return (
      <div key={index} className="mb-2">
        {parts.map((part, i) =>
          part.startsWith("\\(") && part.endsWith("\\)") ? (
            <InlineMath key={i} math={part.slice(2, -2)} />
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <p className="text-center text-muted-foreground">No questions found</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ScrollArea className="h-[400px] border rounded-lg p-4">
        {questions.map((q) => (
          <div key={q.id} className="mb-4">
            {q.content
              .split("\n")
              .map((line, idx) => renderLine(line.trim(), idx))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default TaskDetailPage;
