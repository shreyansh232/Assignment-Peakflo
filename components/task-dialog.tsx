import React from 'react';

import { Button } from "../src/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../src/components/ui/dialog"
import { Input } from "../src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../src/components/ui/select"
import { Textarea } from "../src/components/ui/textarea"
import { useState } from "react"
import type { Task, Status } from "../types/board"

interface TaskDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskDialog({ task, open, onOpenChange, onSave, onDelete }: TaskDialogProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(task)

  if (!task || !editedTask) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              placeholder="Task title"
            />
          </div>
          <div className="grid gap-2">
            <Select
              value={editedTask.status}
              onValueChange={(value: Status) => setEditedTask({ ...editedTask, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not started</SelectItem>
                <SelectItem value="in-progress">In progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Add a description..."
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(task.id)
              onOpenChange(false)
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              onSave(editedTask)
              onOpenChange(false)
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

