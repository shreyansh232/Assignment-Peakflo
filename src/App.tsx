import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { store } from "./store/store";
import Board from "./components/Board";

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Board />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
