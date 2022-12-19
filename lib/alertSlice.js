import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialRState = {
  display: false,
  vertical: "bottom",
  horizontal: "right",
  type: "",
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialRState,
  reducers: {
    notify: (state, action) => {
      return { ...state, ...action.payload, display: true };
    },
    reset: (state, action) => {
      return { ...initialRState };
    },
  },
});
export const { notify, reset } = alertSlice.actions;
export default alertSlice.reducer;
