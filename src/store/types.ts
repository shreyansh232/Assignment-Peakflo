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
}


export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  MOVE_TASK = 'MOVE_TASK'
}