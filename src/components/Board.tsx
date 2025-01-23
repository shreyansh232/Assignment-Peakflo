import {
  DndContext,
  useSensor,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Column as ColumnComponent } from "./Column";
import { TaskDialog } from "./task-dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setSelectedTask,
  setDialogOpen,
  addColumn,
} from "../store/actions";
import type { Task, Status } from "../types/board";
import type { BoardState, Column } from "../store/types";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export default function Board() {
  const dispatch = useDispatch();
  const columns = useSelector(
    (state: { board: BoardState }) => state.board.columns
  );
  const tasks = useSelector(
    (state: { board: BoardState }) => state.board.tasks
  );
  const selectedTask = useSelector(
    (state: { board: BoardState }) => state.board.selectedTask
  );
  const isDialogOpen = useSelector(
    (state: { board: BoardState }) => state.board.isDialogOpen
  );

  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  // Load columns and tasks from local storage on component mount
  useEffect(() => {
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    existingColumns.forEach((column: Column) => dispatch(addColumn(column)));
    existingTasks.forEach((task: Task) => dispatch(addTask(task.status, task.title))); // Adjust as necessary
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    dispatch(moveTask(taskId, newStatus));

    // Update local storage
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((task: Task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `column-${Date.now()}` as Status,
      title: "New Column",
      color: "bg-blue-100",
      tasks: [],
    };
    dispatch(addColumn(newColumn));
    // Save to local storage
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    localStorage.setItem(
      "columns",
      JSON.stringify([...existingColumns, newColumn])
    );
  };

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="w-10 mb-2" onClick={handleAddColumn}>
        <Button variant="destructive">
          <Plus size={16} />
          Add New Status Board
        </Button>
      </div>
      <DndContext sensors={[sensors]} onDragEnd={handleDragEnd}>
        <div className="flex gap-2">
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={() => dispatch(addTask(column.id, "New Task"))}
              onTaskClick={(taskId) => {
                const task = tasks.find((t) => t.id === taskId);
                if (task) {
                  dispatch(setSelectedTask(task));
                  dispatch(setDialogOpen(true));
                }
              }}
            />
          ))}
        </div>
      </DndContext>
      <TaskDialog
        task={selectedTask}
        open={isDialogOpen}
        onOpenChange={(open) => dispatch(setDialogOpen(open))}
        onSave={(task) => dispatch(updateTask(task))}
        onDelete={(taskId) => dispatch(deleteTask(taskId))}
      />
    </div>
  );
}
