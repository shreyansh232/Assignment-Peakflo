import { Provider } from "react-redux";
import { store } from "./store/store";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskEdit from "./components/TaskEdit";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/task/:taskId" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
