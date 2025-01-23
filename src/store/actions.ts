import { ActionTypes } from "./types";
import { Task, Status, Column } from "../types/board";

export const addTask = (status: Status, title: string) => ({
  type: ActionTypes.ADD_TASK,
  payload: {
    id: Math.random().toString(36).substring(7),
    title,
    description: "",
    status: status as Status,
  },
});

export const updateTask = (task: Task) => ({
  type: ActionTypes.UPDATE_TASK,
  payload: task,
});

export const deleteTask = (taskId: string) => ({
  type: ActionTypes.DELETE_TASK,
  payload: taskId,
});

export const moveTask = (taskId: string, newStatus: Status) => ({
  type: ActionTypes.MOVE_TASK,
  payload: { taskId, newStatus },
});

export const addColumn = (column: Column) => ({
  type: ActionTypes.ADD_COLUMN,
  payload: column,
});
export const setSelectedTask = (task: Task | null) => ({
  type: ActionTypes.SET_SELECTED_TASK,
  payload: task,
});

export const setDialogOpen = (isOpen: boolean) => ({
  type: ActionTypes.SET_DIALOG_OPEN,
  payload: isOpen,
});

export const deleteColumn = (columnId: Status) => ({
  type: ActionTypes.DELETE_COLUMN,
  payload: columnId,
});

export const updateColumn = (column: Column) => ({
  type: ActionTypes.UPDATE_COLUMN,
  payload: column,
});

export const updateColumnTitle = (columnId: string, newTitle: string) => ({
  type: "UPDATE_COLUMN_TITLE",
  payload: {
    columnId,
    newTitle,
  },
});

export const clearColumns = () => ({
  type: ActionTypes.CLEAR_COLUMNS,
});
