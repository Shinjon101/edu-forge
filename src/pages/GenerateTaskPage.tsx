"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGenerateQuestions } from "../hooks/useGenerateQuestion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircleIcon, Loader2, Pencil, Save } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GenerateTaskPage() {
  const [prompt, setPrompt] = useState("");
  const [rawText, setRawText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const classroomId = params?.id as string;

  const { mutate, isPending, error } = useGenerateQuestions(classroomId);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    mutate(prompt, {
      onSuccess: (data) => {
        setRawText(data);
        setIsEditing(false);
      },
    });
  };

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

  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Questions</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>An Error occured</AlertTitle>
          <AlertDescription>
            <p>{(error as Error)?.message || "Something went wrong"}</p>
          </AlertDescription>
        </Alert>
      )}

      {rawText && (
        <Card className="p-4 mb-4">
          {isEditing ? (
            <Textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="h-64"
            />
          ) : (
            <ScrollArea className="h-[400px] border rounded-lg p-4">
              {lines.map((line, idx) => renderLine(line, idx))}
            </ScrollArea>
          )}

          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-sm text-muted-foreground flex items-center hover:text-primary"
            >
              {isEditing ? (
                <Save className="w-4 h-4" />
              ) : (
                <Pencil className="w-4 h-4" />
              )}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </Card>
      )}

      <Textarea
        placeholder="Enter a prompt to generate questions..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-2"
      />

      <Button onClick={handleGenerate} disabled={isPending} className="mb-4">
        {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
        Generate
      </Button>
    </div>
  );
}
