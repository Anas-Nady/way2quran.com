import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
  success: false,
};

const createMessageSlice = createSlice({
  name: "createMessage",
  initialState,
  reducers: {
    createMessageRequest: (state) => {
      state.loading = true;
    },
    createMessageSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    createMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    createMessageReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  createMessageReset,
} = createMessageSlice.actions;
export const createMessageReducer = createMessageSlice.reducer;

const getMessageSlice = createSlice({
  name: "getMessage",
  initialState,
  reducers: {
    getMessageRequest: (state) => {
      state.loading = true;
    },
    getMessageSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
      state.success = true;
    },
    getMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getMessageReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  getMessageRequest,
  getMessageSuccess,
  getMessageFailure,
  getMessageReset,
} = getMessageSlice.actions;
export const getMessageReducer = getMessageSlice.reducer;

const listMessagesSlice = createSlice({
  name: "listMessages",
  initialState: {
    loading: false,
    success: false,
    messages: [],
    pagination: {},
    error: null,
  },
  reducers: {
    listMessagesRequest: (state) => {
      state.loading = true;
    },
    listMessagesSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload?.data?.messages;
      state.pagination = action.payload?.data?.pagination;
      state.success = true;
    },
    listMessagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    listMessagesReset: (state) => {
      state.loading = false;
      state.data = [];
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  listMessagesRequest,
  listMessagesSuccess,
  listMessagesFailure,
  listMessagesReset,
} = listMessagesSlice.actions;
export const listMessagesReducer = listMessagesSlice.reducer;

const deleteMessageSlice = createSlice({
  name: "deleteMessage",
  initialState,
  reducers: {
    deleteMessageRequest: (state) => {
      state.loading = true;
    },
    deleteMessageSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    deleteMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteMessageReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
  deleteMessageReset,
} = deleteMessageSlice.actions;
export const deleteMessageReducer = deleteMessageSlice.reducer;
