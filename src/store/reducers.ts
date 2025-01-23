import { ActionTypes } from "./types";
import { initialState } from "./boardSlice";


export const boardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case ActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case ActionTypes.MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };

    case ActionTypes.ADD_COLUMN:
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case ActionTypes.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };

    case ActionTypes.SET_DIALOG_OPEN:
      return {
        ...state,
        isDialogOpen: action.payload,
      };
    case ActionTypes.DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter((column) => column.id !== action.payload),
        tasks: state.tasks.filter((task) => task.status !== action.payload),
      };

    default:
      return state;
  }
};
