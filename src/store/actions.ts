import type { Task } from "./types"

export const ADD_TASK = "ADD_TASK"
export const MOVE_TASK = "MOVE_TASK"

interface AddTaskAction {
  type: typeof ADD_TASK
  payload: Task
}

interface MoveTaskAction {
  type: typeof MOVE_TASK
  payload: {
    taskId: string
    newStatus: Task["status"]
  }
}

export type BoardActionTypes = AddTaskAction | MoveTaskAction

export const addTask = (task: Task): BoardActionTypes => ({
  type: ADD_TASK,
  payload: task,
})

export const moveTask = (taskId: string, newStatus: Task["status"]): BoardActionTypes => ({
  type: MOVE_TASK,
  payload: { taskId, newStatus },
})

