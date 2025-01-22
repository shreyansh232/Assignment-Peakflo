// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Task {
//   id: string;
//   title: string;
//   status: string;
//   description: string;
// }

// interface BoardState {
//   tasks: Task[];
//   statuses: string[];
// }

// const initialState: BoardState = {
//   tasks: [
//     { id: '1', title: 'Card 1', status: 'Not started', description: '' },
//     { id: '2', title: 'Card 2', status: 'In progress', description: '' },
//     { id: '3', title: 'Card 3', status: 'Completed', description: '' },
//     { id: '4', title: 'Card 4', status: 'Not started', description: '' },
//     { id: '5', title: 'Card 5', status: 'Not started', description: '' },
//   ],
//   statuses: ['Not started', 'In progress', 'Completed']
// };

// const boardSlice = createSlice({
//   name: 'board',
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<Task>) => {
//       state.tasks.push(action.payload);
//     },
//     updateTask: (state, action: PayloadAction<Task>) => {
//       const index = state.tasks.findIndex(task => task.id === action.payload.id);
//       if (index !== -1) {
//         state.tasks[index] = action.payload;
//       }
//     },
//     deleteTask: (state, action: PayloadAction<string>) => {
//       state.tasks = state.tasks.filter(task => task.id !== action.payload);
//     },
//     moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: string }>) => {
//       const task = state.tasks.find(t => t.id === action.payload.taskId);
//       if (task) {
//         task.status = action.payload.newStatus;
//       }
//     },
//     addStatus: (state, action: PayloadAction<string>) => {
//       if (!state.statuses.includes(action.payload)) {
//         state.statuses.push(action.payload);
//       }
//     }
//   }
// });

// export const { addTask, updateTask, deleteTask, moveTask, addStatus } = boardSlice.actions;
// export default boardSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Task, BoardState } from "../types/board"

const initialState: BoardState = {
  tasks: [],
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

