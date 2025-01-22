import { ActionTypes } from "./types";
import { Task, Status } from "../types/board";

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
