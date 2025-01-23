import { BoardState, ActionTypes } from "./types";
import { Column, Status } from "../types/board";

const defaultColumns: Column[] = [
  {
    id: "not-started" as Status,
    title: "Not started",
    color: "bg-red-100",
    tasks: [],
  },
  {
    id: "in-progress" as Status,
    title: "In progress",
    color: "bg-yellow-100",
    tasks: [],
  },
  {
    id: "completed" as Status,
    title: "Completed",
    color: "bg-green-100",
    tasks: [],
  },
];

const initialState: BoardState = {
  columns: defaultColumns,
  tasks: [],
  color: "",
  selectedTask: null,
  isDialogOpen: false,
};

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
