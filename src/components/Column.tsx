import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType, Task } from "../types/board";
import { TaskCard } from "./task-card";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteColumn, updateColumnTitle, updateTask } from "../store/actions";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (taskId: string) => void;
}

export const Column = ({ column, tasks, onAddTask }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);
  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateColumnTitle(column.id, editedTitle));
    setIsEditing(false);
    
    // Update localStorage
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    const updatedColumns = existingColumns.map((c: ColumnType) =>
      c.id === column.id ? { ...c, title: editedTitle } : c
    );
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
  };
  

  const handleDelete = () => {
    dispatch(deleteColumn(column.id));
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    const updatedColumns = existingColumns.filter(
      (c: ColumnType) => c.id !== column.id
    );
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((t: Task) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  // const handleSaveTask = (updatedTask: Task) => {
  //   handleUpdateTask(updatedTask);
  // };

  return (
    <Card className="w-80 shadow-lg border border-gray-300">
      <CardHeader
        className={`flex flex-row items-center space-x-2 rounded-t-lg px-4 py-2`}
      >
        <div className="flex flex-1 items-center space-x-2">
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
              autoFocus
            />
          ) : (
            <h3
              className={`font-semibold ${column.color} px-1 rounded-sm text-sm`}
            >
              {column.title}
            </h3>
          )}
          <span className="text-muted-foreground">{tasks.length}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="link" onClick={onAddTask}>
          <Plus size={16} />
        </Button>
      </CardHeader>
      <CardContent ref={setNodeRef} className="p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task.id)}
            onUpdateTask={handleUpdateTask}
          />
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={onAddTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </CardContent>
    </Card>
  );
};
