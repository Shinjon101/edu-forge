"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBigRightIcon, ArrowRight, Loader2 } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useGetQuestionsForTask } from "../hooks/useGetQuestions";
import { useTask } from "@/hooks/useTask";
import TaskDetailSkeleton from "./skeletons/lists/TaskDetailSkeleton";

function TaskDetailPage({ taskId }: { taskId: string }) {
  const { data: questions, isLoading } = useGetQuestionsForTask(taskId);
  const { data: task } = useTask(taskId);

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
    return <TaskDetailSkeleton />;
  }

  if (!questions?.length) {
    return (
      <p className="text-center text-muted-foreground">No questions found</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">{task?.title}</h1>

        <div className="flex gap-2 mb-5 md:justify-center md:items-center md:mb-0 ">
          {task?.created_at && (
            <span className="text-muted-foreground whitespace-nowrap">
              {new Date(task.created_at).toLocaleDateString()}
            </span>
          )}

          <ArrowRight className="animate-pulse" />

          {task?.deadline && (
            <span className=" text-muted-foreground whitespace-nowrap">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <ScrollArea className="h-[400px]  md:h-fit border rounded-lg p-4">
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
