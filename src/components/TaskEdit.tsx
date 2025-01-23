import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask } from "../store/actions";
import type { Task, BoardState } from "../types/board";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function TaskEdit() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const task = useSelector((state: { board: BoardState }) =>
    state.board.tasks.find((t) => t.id === taskId)
  );

  const handleSave = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
  
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = existingTasks.map((t: Task) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    navigate("/");
  };
  

  const handleDelete = () => {
    if (taskId) {
        dispatch(deleteTask(taskId));
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = existingTasks.filter((task: Task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        navigate("/");
    }
};


  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <Card className="w-[600px] h-[500px]">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-20">Edit Task</h1>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (task) {
                handleSave({
                  ...task,
                  title: (e.target as any).title.value,
                  description: (e.target as any).description.value,
                });
              }
            }}
          >
            <label htmlFor="">Title</label>
            <Input name="title" defaultValue={task?.title} className="mb-4" />
            <label htmlFor="">Description</label>
            <Textarea
              name="description"
              defaultValue={task?.description}
              className="mb-4 h-32"
            />
            <div className="flex gap-4">
              <Button type="submit" variant="default">
                Save Changes
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                type="button"
              >
                Delete Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
