import { Card, CardContent } from "./ui/card";
import type { Task } from "../types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="mb-2 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <p className="text-sm">{task.title}</p>
      </CardContent>
    </Card>
  );
}
