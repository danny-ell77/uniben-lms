import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialRState = {
  display: false,
  vertical: "bottom",
  horizontal: "right",
  type: "info",
  message: "Hello world",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialRState,
  reducers: {
    notify: (state, action) => {
      console.log("triggered", action.payload);
      return { ...state, ...action.payload };
    },
    reset: (state, action) => {
      return { ...initialRState };
    },
  },
});
export const { notify, reset } = alertSlice.actions;
export default alertSlice.reducer;