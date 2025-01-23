import { Card, CardContent } from "./ui/card";
import type { Task } from "../types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  // const dispatch = useDispatch();
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
  return (
    <Card
      ref={setNodeRef}
      onClick={handleClick}
      style={style}
      className="mb-2 cursor-grab active:cursor-grabbing shadow-md"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <p className="text-sm">{task.title}</p>
      </CardContent>
      <CardContent className="p-3 pt-0">
          <p className="text-xs text-gray-400 line-clamp-2">
            {task.description || "No description"}
          </p>
        </CardContent>
    </Card>
  );
}
