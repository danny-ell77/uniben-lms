import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authAPI } from "./services/authAPI";

const { login, register } = authAPI.endpoints;

const initialState = {
  user: null,
  token: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.matchFulfilled, register.matchFulfilled),
      (state, { payload: { user, token } }) => {
        if (user) state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    );
  },
});

export default authSlice.reducer;
