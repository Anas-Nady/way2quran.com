import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
