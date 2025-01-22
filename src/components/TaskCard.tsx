// import { Draggable } from 'react-beautiful-dnd';

// interface Task {
//   id: string;
//   title: string;
//   status: string;
//   description: string;
// }

// const TaskCard = ({ task, index }: { task: Task; index: number }) => {
//   return (
//     <Draggable draggableId={task.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white rounded-lg border border-gray-200 p-3 mb-2 cursor-grab hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
//         >
//           <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
//           {task.description && (
//             <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default TaskCard;

import type React from "react"
import { Card, CardContent, Typography, styled } from "@mui/material"
import { Draggable } from "react-beautiful-dnd"
import type { Task } from "../types/board"

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
}))

const StyledCardContent = styled(CardContent)({
  padding: "8px !important",
  "&:last-child": {
    paddingBottom: "8px !important",
  },
})

interface TaskCardProps {
  task: Task
  index: number
  onClick: () => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <StyledCardContent>
            <Typography variant="body2">{task.title}</Typography>
          </StyledCardContent>
        </StyledCard>
      )}
    </Draggable>
  )
}

