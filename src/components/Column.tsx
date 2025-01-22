import type React from "react"
import { Paper, Typography, Button, styled } from "@mui/material"
import { Add as AddIcon, MoreVert as MoreVertIcon } from "@mui/icons-material"
import { Droppable } from "react-beautiful-dnd"
import { TaskCard } from "./TaskCard"
import type { Task } from "../types/board"

const StyledColumn = styled(Paper)(({ theme }) => ({
  width: 280,
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(1),
}))

const ColumnHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const HeaderTitle = styled("div")({
  display: "flex",
  alignItems: "center",
})

const TaskCount = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

const ColumnContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  minHeight: 100,
}))

const AddButton = styled(Button)(({ theme }) => ({
  width: "100%",
  justifyContent: "flex-start",
  textTransform: "none",
  color: theme.palette.text.secondary,
}))

interface ColumnProps {
  title: string
  tasks: Task[]
  status: Task["status"]
  onAddTask: () => void
  onTaskClick: (task: Task) => void
}

export const Column: React.FC<ColumnProps> = ({ title, tasks, status, onAddTask, onTaskClick }) => {
  return (
    <StyledColumn>
      <ColumnHeader>
        <HeaderTitle>
          <Typography variant="subtitle1">{title}</Typography>
          <TaskCount variant="body2">{tasks.length}</TaskCount>
        </HeaderTitle>
        <MoreVertIcon fontSize="small" />
      </ColumnHeader>
      <Droppable droppableId={status}>
        {(provided) => (
          <ColumnContent ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onClick={() => onTaskClick(task)} />
            ))}
            {provided.placeholder}
            <AddButton startIcon={<AddIcon />} onClick={onAddTask}>
              New
            </AddButton>
          </ColumnContent>
        )}
      </Droppable>
    </StyledColumn>
  )
}

