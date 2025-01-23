export type Status = "not-started" | "in-progress" | "completed"

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: 'high' | 'medium' | 'low' | string;
}

export interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}
export interface BoardState {
    tasks: Task[];
    columns: Column[];
    color: string; 
    selectedTask: Task | null
    isDialogOpen: boolean
  }
