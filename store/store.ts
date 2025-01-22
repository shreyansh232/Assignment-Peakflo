import React from "react";
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Column, Task, Status } from "../types/board"

interface BoardState {
  columns: Column[]
  tasks: Task[]
  addTask: (status: Status, title: string) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, newStatus: Status) => void
}

const defaultColumns: Column[] = [
  {
    id: "not-started",
    title: "Not started",
    color: "bg-red-100",
    tasks: [],
  },
  {
    id: "in-progress",
    title: "In progress",
    color: "bg-yellow-100",
    tasks: [],
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-100",
    tasks: [],
  },
]

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      columns: defaultColumns,
      tasks: [],
      addTask: (status, title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.random().toString(36).substring(7),
              title,
              description: "",
              status,
            },
          ],
        })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
        })),
    }),
    {
      name: "board-store",
    },
  ),
)

