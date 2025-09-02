import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  taskTitle: string;
  tempTitle: string;
  setTempTitle: (t: string) => void;
  setTaskTitle: (t: string) => void;
}

const TaskTitle = ({
  taskTitle,
  tempTitle,
  setTempTitle,
  setTaskTitle,
}: Props) => {
  const handleUpdateTitle = () => {
    setTaskTitle(tempTitle.trim() || "New Task");
  };
  return (
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
  );
};

export default TaskTitle;
