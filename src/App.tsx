import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import store from "./store/index";
import  Board  from "./Board";

const theme = createTheme()

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
