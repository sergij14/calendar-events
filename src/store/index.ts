import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// ...

export const store = configureStore({
  middleware: [thunk],
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
