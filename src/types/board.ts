export type Status = "not-started" | "in-progress" | "completed"

export interface Task {
  id: string
  title: string
  description: string
  status: Status
}

export interface Column {
  id: Status
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
