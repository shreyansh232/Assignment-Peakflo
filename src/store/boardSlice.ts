import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task, BoardState } from "../types/board"

const initialState: BoardState = {
  tasks: [],
  columns: [], 
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: Task["status"] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.newStatus
      }
    },
  },
})

export const { addTask, updateTask, deleteTask, moveTask } = boardSlice.actions
export default boardSlice.reducer

