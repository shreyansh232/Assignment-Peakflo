import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task, BoardState, Column } from "../types/board"
import { getTasksFromLocalStorage } from '../utils/localStorage';  


export const defaultColumns: Column[] = [
    {
      id: "not-started",
      title: "Not started",
      color: "bg-red-200",
      tasks: [],
    },
    {
      id: "in-progress",
      title: "In progress",
      color: "bg-yellow-200",
      tasks: [],
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-green-200",
      tasks: [],
    },
  ];
  
  

export const initialState: BoardState = {
  columns: defaultColumns,
  tasks: getTasksFromLocalStorage(),
  color: "",
  selectedTask: null,
  isDialogOpen: false,
};

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
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload)
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload
    },
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload)
      state.tasks = state.tasks.filter((task) => task.status !== action.payload)
    },
  },
})

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  addColumn, 
  setSelectedTask, 
  setDialogOpen, 
  deleteColumn 
} = boardSlice.actions

export default boardSlice.reducer
