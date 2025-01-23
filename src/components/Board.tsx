import {
  DndContext,
  useSensor,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Column as ColumnComponent } from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { addTask, moveTask, addColumn } from "../store/actions";
import type { Task } from "../types/board";
import type { BoardState, Column } from "../store/types";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors to get columns and tasks from state
  const columns = useSelector(
    (state: { board: BoardState }) => state.board.columns
  );
  const tasks = useSelector(
    (state: { board: BoardState }) => state.board.tasks
  );

  // Configure drag sensor with minimum distance threshold
  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  // Handle drag and drop of tasks between columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    dispatch(moveTask(taskId, newStatus));

    // Sync task status changes with localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((task: Task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Create new column with default properties
  const handleAddColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: "New Column",
      color: "bg-blue-100",
      tasks: [],
    };

    dispatch(addColumn(newColumn));
    // Persist new column to localStorage
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    localStorage.setItem(
      "columns",
      JSON.stringify([...existingColumns, newColumn])
    );
  };

  // Create new task in specified column
  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title: "New Task",
      description: "",
      status: columnId,
      priority: "medium",
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskExists = existingTasks.some(
      (task: Task) => task.id === newTask.id
    );

    if (!taskExists) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([...existingTasks, newTask])
      );
      dispatch(addTask(newTask));
    }
  };

  // Flag to ensure columns are loaded only once
  const hasLoaded = useRef(false);

  // Load existing columns from localStorage on component mount
  useEffect(() => {
    if (hasLoaded.current) return;

    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");

    existingColumns.forEach((column: Column) => {
      dispatch(addColumn(column));
    });

    hasLoaded.current = true;
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Header section with logo */}
      <div className="flex gap-2 border-b border-gray-100 shadow-md mb-5">
        <div className="p-8 flex gap-1">
          <img
            src="./peakflo_logo.webp"
            alt="logo"
            className="h-10 w-10 rounded-md"
          />
          <h1 className="text-4xl font-bold">Peakflo Board</h1>
        </div>
      </div>

      {/* Main board content with columns and tasks */}
      <div className="p-8">
        <div className="w-10 mb-4">
          <Button
            variant="default"
            className="bg-gray-800 hover:bg-gray-900"
            onClick={handleAddColumn}
          >
            <Plus size={16} />
            New Status
          </Button>
        </div>
        <DndContext sensors={[sensors]} onDragEnd={handleDragEnd}>
          <div className="flex flex-wrap gap-2">
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                onAddTask={() => handleAddTask(column.id)}
                onTaskClick={(taskId) => {
                  navigate(`/task/${taskId}`);
                }}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
