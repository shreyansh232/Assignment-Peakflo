import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { Column } from "../components/column"
import { TaskDialog } from "../components/task-dialog"
import { useBoardStore } from "../store/store"
import { useState } from "react"
import type { Task } from "./types/board"

export default function Board() {
  const { columns, tasks, addTask, updateTask, deleteTask, moveTask } = useBoardStore()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task["status"]

    moveTask(taskId, newStatus)
  }

  return (
    <div className="flex min-h-screen flex-col p-8">
      <h1 className="mb-8 text-3xl font-bold">Project Board</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={() => addTask(column.id, "New Task")}
              onTaskClick={(taskId) => {
                const task = tasks.find((t) => t.id === taskId)
                if (task) {
                  setSelectedTask(task)
                  setDialogOpen(true)
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
        onSave={updateTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

