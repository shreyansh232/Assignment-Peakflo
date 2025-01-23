import {
  DndContext,
  useSensor,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Column as ColumnComponent } from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, moveTask, addColumn } from "../store/actions";
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
  const columns = useSelector(
    (state: { board: BoardState }) => state.board.columns
  );
  const tasks = useSelector(
    (state: { board: BoardState }) => state.board.tasks
  );

  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];
    dispatch(moveTask(taskId, newStatus));
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((task: Task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  const handleAddColumn = () => {
    console.log("Adding a new column");
    const newColumn: Column = {
      id: uuidv4(),
      title: "New Column",
      color: "bg-blue-100",
      tasks: [],
    };

    dispatch(addColumn(newColumn));
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    localStorage.setItem(
      "columns",
      JSON.stringify([...existingColumns, newColumn])
    );
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: "New Task",
      description: "",
      status: columnId,
    };

    dispatch(addTask(newTask));
    const currentTasks = tasks;
    localStorage.setItem("tasks", JSON.stringify([...currentTasks, newTask]));
  };

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;

    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const uniqueColumns = existingColumns.filter(
      (column: Column) =>
        !columns.some((existingColumn) => existingColumn.id === column.id)
    );

    uniqueColumns.forEach((column: Column) => {
      if (!columns.some((existingColumn) => existingColumn.id === column.id)) {
        dispatch(addColumn(column));
      }
    });

    existingTasks.forEach((task: Task) => dispatch(updateTask(task)));

    hasLoaded.current = true;
  }, [dispatch, columns]);

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="flex gap-2 border-b border-gray-100 shadow-md mb-5">
        <div className="p-8 flex gap-1">
        <img
            src="./public/peakflo_logo.webp"
            alt="logo"
            className="h-10 w-10 rounded-md"
          />
          <h1 className="text-4xl font-bold">Peakflo Board</h1>
      </div>
      </div>
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
