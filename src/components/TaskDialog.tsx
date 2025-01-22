import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material"
import type { Task } from "../types/board"

const Form = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}))

const Actions = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}))

interface TaskDialogProps {
  task: Task | null
  open: boolean
  onClose: () => void
  onSave: (task: Task) => void
  onDelete: (taskId: string) => void
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ task, open, onClose, onSave, onDelete }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  if (!editedTask) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Form>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status}
              label="Status"
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  status: e.target.value as Task["status"],
                })
              }
            >
              <MenuItem value="not-started">Not Started</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
        </Form>
      </DialogContent>
      <Actions>
        <Button
          onClick={() => {
            onDelete(editedTask.id)
            onClose()
          }}
          color="error"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            onSave(editedTask)
            onClose()
          }}
          color="primary"
        >
          Save
        </Button>
      </Actions>
    </Dialog>
  )
}

