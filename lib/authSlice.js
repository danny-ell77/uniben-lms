import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authAPI } from "./services/authAPI";

const { login, register } = authAPI.endpoints;

const initialRState = {
  user: null,
  token: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialRState,
  reducers: {
    logOut: (state, action) => {
      return {...initialRState}
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

export const {logOut} = authSlice.actions

export default authSlice.reducer;
