import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loading: false,
  token: null,
  user: userFromStorage,
  success: false,
  error: null,
};

const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.success = true;
      state.user = action.payload.user;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.success = false;
      state.user = null;
      state.error = action.payload;
    },
    userReset: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    userLogout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userReset,
  userLogout,
} = loginUserSlice.actions;
export const userLoginReducer = loginUserSlice.reducer;
