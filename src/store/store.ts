import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});
