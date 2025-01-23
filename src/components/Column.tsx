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
import type { Column as ColumnType, Task, Status } from "../types/board";
import { TaskCard } from "./task-card";
import { addColumn } from "../store/actions";
import { useDispatch } from "react-redux";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onTaskClick: (taskId: string) => void;
}

export function Column({ column, tasks, onAddTask, onTaskClick }: ColumnProps) {
  const dispatch = useDispatch();
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const handleAddColumn = () => {
    dispatch(addColumn({
      id: `column-${Date.now()}` as Status,
      title: "New Column",
      color: "bg-blue-100",
      tasks: []
    }));
  };

  return (
    <Card className="w-80">
      <CardHeader
        className={`flex flex-row items-center space-x-2 rounded-t-lg px-4 py-2`}
      >
        <div className="flex flex-1 items-center space-x-2">
          <h3 className={`font-semibold ${column.color} px-1 rounded-sm text-sm`}>{column.title}</h3>
          <span className="text-muted-foreground">{tasks.length}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Plus size={16} onClick={handleAddColumn} className="cursor-pointer"/>
      </CardHeader>
      <CardContent ref={setNodeRef} className="p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task.id)}
          />
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={onAddTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </CardContent>
    </Card>
  );
}
