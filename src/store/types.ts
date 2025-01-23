import {Task} from '../types/board'
import { Status } from '../types/board'
export interface Column {
  id: Status;
  title: string;
  tasks: Task[];
  color: string; 
}

export interface BoardState {
  tasks: Task[];
  columns: Column[];
  color: string; 
  selectedTask: Task | null
  isDialogOpen: boolean
}


export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  MOVE_TASK = 'MOVE_TASK',
  ADD_COLUMN = 'ADD_COLUMN',
  SET_SELECTED_TASK = 'SET_SELECTED_TASK',
  SET_DIALOG_OPEN = 'SET_DIALOG_OPEN',
  DELETE_COLUMN = 'DELETE_COLUMN',
  UPDATE_COLUMN = 'UPDATE_COLUMN',
  CLEAR_COLUMNS = 'CLEAR_COLUMNS'

}
export interface UpdateColumnTitleAction {
  type: 'UPDATE_COLUMN_TITLE';
  payload: {
    columnId: string;
    newTitle: string;
  };
}