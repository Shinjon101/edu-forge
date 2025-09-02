"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGenerateQuestions } from "../../hooks/useGenerateQuestion";
import { usePublishTask } from "../../hooks/usePublishTask";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  AlertCircleIcon,
  Loader2,
  Pencil,
  Save,
  ArrowLeft,
} from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { GenerateTaskSkeleton } from "../skeletons/lists/GenerateTaskSkeleton";
import TaskTitle from "./TaskTitle";
import ErrorAlert from "./ErrorAlert";
import TaskPreview from "./TaskPreview";
import DeadlineDialog from "./DeadLineModal";

export default function GenerateTaskPage() {
  const [taskTitle, setTaskTitle] = useState("New Task");
  const [tempTitle, setTempTitle] = useState("New Task");
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [rawText, setRawText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
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
        setHasGenerated(true);
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

  const handleBack = () => {
    setManualMode(false);
    setHasGenerated(false);
    setRawText("");
    setIsEditing(false);
    setPrompt("");
    setLastPrompt("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskTitle
        taskTitle={taskTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        setTaskTitle={setTaskTitle}
      />

      {(generateError || publishError) && (
        <ErrorAlert error={generateError || publishError} />
      )}

      {(rawText || manualMode) && (
        <>
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          {!isGenerating && (
            <TaskPreview
              rawText={rawText}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              manualMode={manualMode}
              setRawText={setRawText}
            />
          )}
        </>
      )}

      {isGenerating && <GenerateTaskSkeleton />}
      {!manualMode && (
        <Textarea
          placeholder="Enter a prompt to generate questions..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-2"
        />
      )}

      <div className="flex gap-2 mb-4">
        {!manualMode && (
          <Button
            onClick={handleGenerate}
            disabled={
              isGenerating ||
              !prompt.trim() ||
              prompt.trim() === lastPrompt.trim()
            }
          >
            {isGenerating && <Loader2 className="animate-spin mr-2" />}
            Generate
          </Button>
        )}

        {!hasGenerated && !manualMode && (
          <Button
            onClick={() => {
              setManualMode(true);
              setIsEditing(true);
            }}
          >
            Add Manually
          </Button>
        )}
        {(rawText || manualMode) && (
          <Button
            onClick={handlePublishClick}
            disabled={isPublishing || (!manualMode && !rawText.trim())}
            className="mb-4 ml-2"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        )}
      </div>

      <DeadlineDialog
        open={showDeadlineModal}
        setOpen={setShowDeadlineModal}
        deadline={deadline}
        setDeadline={setDeadline}
        confirmPublish={confirmPublish}
        isPublishing={isPublishing}
      />
    </div>
  );
}
