import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
  success: false,
};

const listRecitersSlice = createSlice({
  name: "listReciters",
  initialState: { loading: false, success: false, data: [], error: null },
  reducers: {
    listRecitersRequest: (state) => {
      state.loading = true;
    },
    listRecitersSuccess: (state, action) => {
      state.loading = false;
      state.reciters = action.payload?.data?.reciters;
      state.pagination = action.payload?.data?.pagination;
      state.recitation = action.payload?.data?.recitation;
      state.success = true;
    },
    listRecitersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    listRecitersReset: (state) => {
      state.loading = false;
      state.data = [];
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  listRecitersRequest,
  listRecitersSuccess,
  listRecitersFailure,
  listRecitersReset,
} = listRecitersSlice.actions;
export const listRecitersReducer = listRecitersSlice.reducer;

const createReciterSlice = createSlice({
  name: "createReciter",
  initialState,
  reducers: {
    createReciterRequest: (state) => {
      state.loading = true;
    },
    createReciterSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    createReciterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    createReciterReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  createReciterRequest,
  createReciterSuccess,
  createReciterFailure,
  createReciterReset,
} = createReciterSlice.actions;
export const createReciterReducer = createReciterSlice.reducer;

const getReciterSlice = createSlice({
  name: "getReciter",
  initialState,
  reducers: {
    getReciterRequest: (state) => {
      state.loading = true;
    },
    getReciterSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
      state.success = true;
    },
    getReciterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getReciterReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  getReciterRequest,
  getReciterSuccess,
  getReciterFailure,
  getReciterReset,
} = getReciterSlice.actions;
export const getReciterReducer = getReciterSlice.reducer;

const updateReciterSlice = createSlice({
  name: "updateReciter",
  initialState,
  reducers: {
    updateReciterRequest: (state) => {
      state.loading = true;
    },
    updateReciterSuccess: (state, action) => {
      state.loading = false;
      state.updatedReciter = action.payload?.data;
      state.success = true;
    },
    updateReciterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    updateReciterReset: (state) => {
      state.loading = false;
      state.updatedReciter = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  updateReciterRequest,
  updateReciterSuccess,
  updateReciterFailure,
  updateReciterReset,
} = updateReciterSlice.actions;
export const updateReciterReducer = updateReciterSlice.reducer;

const uploadRecitationSlice = createSlice({
  name: "uploadRecitation",
  initialState,
  reducers: {
    uploadRecitationRequest: (state) => {
      state.loading = true;
    },
    uploadRecitationSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
      state.success = true;
    },
    uploadRecitationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    uploadRecitationReset: (state) => {
      state.loading = false;
      state.data = {};
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  uploadRecitationRequest,
  uploadRecitationSuccess,
  uploadRecitationFailure,
  uploadRecitationReset,
} = uploadRecitationSlice.actions;
export const uploadRecitationReducer = uploadRecitationSlice.reducer;

const getReciterProfileSlice = createSlice({
  name: "getReciterProfile",
  initialState: {
    loading: false,
    success: false,
    error: null,
    recitationsInfo: [],
  },
  reducers: {
    getReciterProfileRequest: (state) => {
      state.loading = true;
    },
    getReciterProfileSuccess: (state, action) => {
      state.loading = false;
      state.recitationsInfo = action.payload?.recitationsInfo;
      state.reciterInfo = action.payload?.reciterInfo;
      state.success = true;
    },
    getReciterProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getReciterProfileReset: (state) => {
      state.loading = false;
      state.recitationsInfo = [];
      state.reciterInfo = null;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  getReciterProfileRequest,
  getReciterProfileSuccess,
  getReciterProfileFailure,
  getReciterProfileReset,
} = getReciterProfileSlice.actions;
export const getReciterProfileReducer = getReciterProfileSlice.reducer;

const deleteReciterSlice = createSlice({
  name: "deleteReciter",
  initialState,
  reducers: {
    deleteReciterRequest: (state) => {
      state.loading = true;
    },
    deleteReciterSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteReciterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteReciterReset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  deleteReciterRequest,
  deleteReciterSuccess,
  deleteReciterFailure,
  deleteReciterReset,
} = deleteReciterSlice.actions;
export const deleteReciterReducer = deleteReciterSlice.reducer;

const deleteReciterRecitationSlice = createSlice({
  name: "deleteReciterRecitation",
  initialState,
  reducers: {
    deleteReciterRecitationRequest: (state) => {
      state.loading = true;
    },
    deleteReciterRecitationSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteReciterRecitationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteReciterRecitationReset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  deleteReciterRecitationRequest,
  deleteReciterRecitationSuccess,
  deleteReciterRecitationFailure,
  deleteReciterRecitationReset,
} = deleteReciterRecitationSlice.actions;
export const deleteReciterRecitationReducer =
  deleteReciterRecitationSlice.reducer;

const deleteReciterSurahSlice = createSlice({
  name: "deleteReciterSurah",
  initialState,
  reducers: {
    deleteReciterSurahRequest: (state) => {
      state.loading = true;
    },
    deleteReciterSurahSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    deleteReciterSurahFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    deleteReciterSurahReset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  deleteReciterSurahRequest,
  deleteReciterSurahSuccess,
  deleteReciterSurahFailure,
  deleteReciterSurahReset,
} = deleteReciterSurahSlice.actions;
export const deleteReciterSurahReducer = deleteReciterSurahSlice.reducer;
