export interface Task {
    id: string
    title: string
    status: "not-started" | "in-progress" | "completed"
  }
  
  export interface BoardState {
    tasks: Task[]
  }
  
  