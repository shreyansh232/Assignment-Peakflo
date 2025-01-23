import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Column } from "./Column";
import { TaskDialog } from "./task-dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask, moveTask } from "../store/actions";
import type { Task } from "../types/board";
import type { BoardState } from "../store/types";
export default function Board() {
  const dispatch = useDispatch();
  const columns = useSelector(
    (state: { board: BoardState }) => state.board.columns
  );
  const tasks = useSelector(
    (state: { board: BoardState }) => state.board.tasks
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    dispatch(moveTask(taskId, newStatus));
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={() =>
                dispatch(addTask(column.id as Task["status"], "New Task"))
              }
              onTaskClick={(taskId) => {
                const task = tasks.find((t) => t.id === taskId);
                if (task) {
                  setSelectedTask(task);
                  setDialogOpen(true);
                }
              }}
            />
          ))}
        </div>
      </DndContext>
      <TaskDialog
        task={selectedTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={(task) => dispatch(updateTask(task))}
        onDelete={(taskId) => dispatch(deleteTask(taskId))}
      />
    </div>
  );
}
