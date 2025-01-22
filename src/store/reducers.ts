import type { BoardState } from "./types"
import { ADD_TASK, MOVE_TASK, type BoardActionTypes } from "./actions"

const initialState: BoardState = {
  tasks: [],
}

export const boardReducer = (state = initialState, action: BoardActionTypes): BoardState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, status: action.payload.newStatus } : task,
        ),
      }
    default:
      return state
  }
}

