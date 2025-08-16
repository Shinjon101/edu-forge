"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGenerateQuestions } from "../hooks/useGenerateQuestion";
import { usePublishTask } from "../hooks/usePublishTask";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircleIcon, Loader2, Pencil, Save } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

export default function GenerateTaskPage() {
  const [taskTitle, setTaskTitle] = useState("New Task");
  const [tempTitle, setTempTitle] = useState("New Task");
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [rawText, setRawText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const params = useParams();
  const classroomId = params?.id as string;

  const {
    mutate: generate,
    isPending: isGenerating,
    error: generateError,
  } = useGenerateQuestions(classroomId);

  const {
    mutate: publish,
    isPending: isPublishing,
    error: publishError,
  } = usePublishTask(classroomId);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generate(prompt, {
      onSuccess: (data) => {
        setRawText(data);
        setIsEditing(false);
        setLastPrompt(prompt);
      },
    });
  };

  const handlePublishClick = () => {
    if (!taskTitle.trim()) return;
    setShowDeadlineModal(true);
  };

  const confirmPublish = () => {
    publish({ title: taskTitle, rawText, deadline });
    setShowDeadlineModal(false);
  };

  const handleUpdateTitle = () => {
    setTaskTitle(tempTitle.trim() || "New Task");
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
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Enter task title..."
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
        <Button
          onClick={handleUpdateTitle}
          size="sm"
          disabled={tempTitle.trim() === taskTitle.trim()}
        >
          Update
        </Button>
      </div>

      {(generateError || publishError) && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>An Error Occurred</AlertTitle>
          <AlertDescription>
            {(generateError as Error)?.message ||
              (publishError as Error)?.message ||
              "Something went wrong"}
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
                <>
                  <Save className="w-4 h-4 mr-1" /> Save
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </>
              )}
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

      <Button
        onClick={handleGenerate}
        disabled={
          isGenerating || !prompt.trim() || prompt.trim() === lastPrompt.trim()
        }
        className="mb-4"
      >
        {isGenerating && <Loader2 className="animate-spin mr-2" />}
        Generate
      </Button>

      {rawText && (
        <Button
          onClick={handlePublishClick}
          disabled={isPublishing}
          className="mb-4 ml-2"
        >
          {isPublishing && <Loader2 className="animate-spin mr-2" />}
          Publish
        </Button>
      )}

      <Dialog open={showDeadlineModal} onOpenChange={setShowDeadlineModal}>
        <DialogContent>
          <DialogTitle className="text-center">Set Task Deadline</DialogTitle>

          <div className="flex justify-center items-center py-4 ">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              className="rounded-md border"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeadlineModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmPublish} disabled={isPublishing}>
              {isPublishing && <Loader2 className="animate-spin mr-2" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
