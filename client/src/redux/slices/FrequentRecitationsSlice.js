import { createSlice } from "@reduxjs/toolkit";

const listFrequentRecitationsSlice = createSlice({
  name: "listFrequentRecitations",
  initialState: {
    loading: false,
    success: false,
    recitations: [],
    error: null,
  },
  reducers: {
    listFrequentRecitationsRequest: (state) => {
      state.loading = true;
    },
    listFrequentRecitationsSuccess: (state, action) => {
      state.loading = false;
      state.recitations = action.payload?.data;
      state.success = true;
      state.error = null;
    },
    listFrequentRecitationsFailure: (state, action) => {
      state.loading = false;
      state.recitations = [];
      state.success = false;
      state.error = action.payload;
    },
    listFrequentRecitationsReset: (state) => {
      state.recitations = [];
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
});

export const {
  listFrequentRecitationsRequest,
  listFrequentRecitationsSuccess,
  listFrequentRecitationsFailure,
  listFrequentRecitationsReset,
} = listFrequentRecitationsSlice.actions;
export const listFrequentRecitationsReducer =
  listFrequentRecitationsSlice.reducer;

const getFrequentRecitationSlice = createSlice({
  name: "getFrequentRecitation",
  initialState: {
    loading: false,
    frequentRecitation: {},
    error: null,
  },
  reducers: {
    getFrequentRecitationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFrequentRecitationSuccess: (state, action) => {
      state.loading = false;
      state.frequentRecitation = action.payload;
      state.error = null;
    },
    getFrequentRecitationFailure: (state, action) => {
      state.loading = false;
      state.frequentRecitation = {};
      state.error = action.payload;
    },
  },
});

export const {
  getFrequentRecitationRequest,
  getFrequentRecitationSuccess,
  getFrequentRecitationFailure,
} = getFrequentRecitationSlice.actions;
export const getFrequentRecitationReducer = getFrequentRecitationSlice.reducer;

const createFrequentRecitationSlice = createSlice({
  name: "CreateFrequentRecitation",
  initialState: {
    loading: false,
    frequentRecitation: {},
    error: null,
  },
  reducers: {
    createFrequentRecitationRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createFrequentRecitationSuccess: (state, action) => {
      state.loading = false;
      state.frequentRecitation = action.payload;
      state.error = null;
    },
    createFrequentRecitationFailure: (state, action) => {
      state.loading = false;
      state.frequentRecitation = {};
      state.error = action.payload;
    },
    createFrequentRecitationReset: (state) => {
      state.loading = false;
      state.frequentRecitation = {};
      state.error = null;
    },
  },
});

export const {
  createFrequentRecitationRequest,
  createFrequentRecitationSuccess,
  createFrequentRecitationFailure,
} = createFrequentRecitationSlice.actions;
export const createFrequentRecitationReducer =
  createFrequentRecitationSlice.reducer;
