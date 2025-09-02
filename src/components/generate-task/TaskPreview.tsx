import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save } from "lucide-react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Props {
  rawText: string;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  manualMode: boolean;
  setRawText: (val: string) => void;
}

export default function TaskPreview({
  rawText,
  isEditing,
  setIsEditing,
  manualMode,
  setRawText,
}: Props) {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

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

  return (
    <Card className="p-4 mb-4">
      {isEditing || manualMode ? (
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

      {!manualMode && (
        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsEditing(!isEditing)}
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
      )}
    </Card>
  );
}
