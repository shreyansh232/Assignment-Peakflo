import { Card, CardContent } from "./ui/card";
import type { Task } from "../types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onClick, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const handleClick = () => {
    if (!isDragging) {
      onClick();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <Card
      ref={setNodeRef}
      onClick={handleClick}
      style={style}
      className="mb-2 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start">
            <p className="text-sm">{task.title}</p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs py-1 rounded-full ${getPriorityColor(task.priority)}`}
              >
                Priority: {task.priority}
              </span>
            </div>
          </div>
          <Button
            variant="link"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-red-100"
            onClick={handleDelete}
          >
            <Trash2 className="text-red-500 h-6 w-6" />
          </Button>
        </div>
      </CardContent>
      <CardContent className="px-3">
        <p className="text-xs text-gray-400 line-clamp-2">
          {task.description || "Write description here..."}
        </p>
      </CardContent>
    </Card>
  );
}
