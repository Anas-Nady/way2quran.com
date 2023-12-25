import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: null,
  success: false,
};

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState,
  reducers: {
    updateUserProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    updateUserProfileFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    updateUserProfileReset: (state) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  updateUserProfileReset,
} = updateUserProfileSlice.actions;
export const updateUserProfileReducer = updateUserProfileSlice.reducer;

const getUserProfileSlice = createSlice({
  name: "getUserProfile",
  initialState: { loading: false, error: null, data: null, success: false },
  reducers: {
    getUserProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    getUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    getUserProfileFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      state.success = false;
    },
    getUserProfileReset: (state) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFailure,
  getUserProfileReset,
} = getUserProfileSlice.actions;
export const getUserProfileReducer = getUserProfileSlice.reducer;
