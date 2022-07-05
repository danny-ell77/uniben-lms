import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { apiSlice } from "./services";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
