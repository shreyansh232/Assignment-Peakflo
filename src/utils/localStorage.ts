import { Task } from "../types/board";

export const getTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};
