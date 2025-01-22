// import {
//   DragDropContext,
//   Droppable,
//   DropResult,
// } from "react-beautiful-dnd";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import { useDispatch } from "react-redux";
// import { addTask, moveTask } from "../store/boardSlice";
// import { Plus } from "lucide-react";
// import TaskCard from "./TaskCard";

// const Board = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state: RootState) => state.board.tasks);
//   const statuses = useSelector((state: RootState) => state.board.statuses);

//   const statusStyles: Record<string, string> = {
//     "Not started": "bg-red-100 text-red-700",
//     "In progress": "bg-yellow-100 text-yellow-700",
//     Completed: "bg-green-100 text-green-700",
//   };

//   const handleAddTask = (status: string) => {
//     const newTask = {
//       id: Date.now().toString(),
//       title: `New Task`,
//       status: status,
//       description: "",
//     };
//     dispatch(addTask(newTask));
//   };

//   const onDragEnd = (result: DropResult) => {
//     const { destination, draggableId } = result;
//     if (!destination) return;
  
//     dispatch(moveTask({
//       taskId: draggableId,
//       newStatus: destination.droppableId
//     }));
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="flex gap-6 overflow-x-auto pb-4">
//           {statuses.map((status) => (
//             <div key={status} className="flex-shrink-0 w-80">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 <div className="p-3 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <h2
//                       className={`text-sm font-medium px-2 py-1 rounded-full ${statusStyles[status]}`}
//                     >
//                       {status}
//                     </h2>
//                     <span className="text-gray-600 text-xs font-medium">
//                       {tasks.filter((task) => task.status === status).length}
//                     </span>
//                   </div>
//                 </div>

//                 <Droppable droppableId={status}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className="p-2 min-h-[150px] space-y-2"
//                     >
//                       {tasks
//                         .filter((task) => task.status === status)
//                         .map((task, index) => (
//                           <TaskCard
//                             key={task.id}
//                             task={task}
//                             index={index}
//                           />
//                         ))}

//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>

//                 <div className="p-3">
//                   <button
//                     onClick={() => handleAddTask(status)}
//                     className="w-full text-left text-sm text-gray-500 flex items-center gap-1"
//                   >
//                     <Plus size={16} /> New
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Board;

import type React from "react"
import { useState } from "react"
import { styled } from "@mui/material"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { Column } from "./Column"
import { TaskDialog } from "./TaskDialog"
import type { RootState } from "../store/index"
import { addTask, updateTask, deleteTask, moveTask } from "../store/boardSlice"
import type { Task } from "../types/board"

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3),
}))

const Title = styled("h1")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

const Columns = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}))

const columns = [
  { id: "not-started", title: "Not Started", color: "#ffebee" },
  { id: "in-progress", title: "In Progress", color: "#fff3e0" },
  { id: "completed", title: "Completed", color: "#e8f5e9" },
]

export const Board: React.FC = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.board.tasks)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        newStatus: destination.droppableId as Task["status"],
      }),
    )
  }

  const handleAddTask = (status: Task["status"]) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Task",
      description: "",
      status,
    }
    dispatch(addTask(newTask))
  }

  return (
    <Root>
      <Title>Kanban Board</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Columns>
          {columns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              status={column.id as Task["status"]}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={() => handleAddTask(column.id as Task["status"])}
              onTaskClick={(task) => {
                setSelectedTask(task)
                setIsDialogOpen(true)
              }}
            />
          ))}
        </Columns>
      </DragDropContext>
      <TaskDialog
        task={selectedTask}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={(task) => dispatch(updateTask(task))}
        onDelete={(taskId) => dispatch(deleteTask(taskId))}
      />
    </Root>
  )
}


