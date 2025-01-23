import {
  DndContext,
  useSensor,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { Column as ColumnComponent } from "./Column";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTask,
  moveTask,
  addColumn,
  clearColumns
} from "../store/actions";
import type { Task, Status } from "../types/board";
import type { BoardState, Column } from "../store/types";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
    setTimeout(() => {
      const newColumn: Column = {
        id: `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` as Status,
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
    }, 500); 
  };
  
  const handleAddTask = (columnId: Status) => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      description: "",
      status: columnId
    };
    
    dispatch(addTask(columnId, "New Task"));
    const currentTasks = tasks;
    localStorage.setItem("tasks", JSON.stringify([...currentTasks, newTask]));
  };

  useEffect(() => {
    const existingColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    // Filter out columns that already exist in Redux store
    const uniqueColumns = existingColumns.filter(
      (column: Column) => !columns.some(existingColumn => existingColumn.id === column.id)
    );
    
    // Only add new unique columns
    uniqueColumns.forEach((column: Column) => dispatch(addColumn(column)));
    existingTasks.forEach((task: Task) => dispatch(updateTask(task)));
  }, [dispatch, columns]);
  


  
  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="w-10 mb-2" onClick={handleAddColumn}>
        <Button variant="default" className="bg-blue-700 hover:bg-blue-900">
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
              onAddTask={() => handleAddTask(column.id)}
              onTaskClick={(taskId) => {
                navigate(`/task/${taskId}`);
              }}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
