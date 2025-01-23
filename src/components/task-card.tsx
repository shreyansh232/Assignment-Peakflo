import { Card, CardContent } from "./ui/card";
import type { Task } from "../types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/actions";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const existingTask = existingTasks.find((t: Task) => t.id === task.id);
    if (existingTask) {
      dispatch(updateTask(existingTask));
    }
  }, [dispatch, task.id]);

  return (
    <Card
      ref={setNodeRef}
      onClick={handleClick}
      style={style}
      className="mb-2 cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-3">
        <p className="text-sm">{task.title}</p>
      </CardContent>
    </Card>
  );
}
