import { combineReducers } from "@reduxjs/toolkit";
import { userLoginReducer } from "./slices/authSlices";

import {
  getUserProfileReducer,
  updateUserProfileReducer,
} from "./slices/userSlice";
import {
  createReciterReducer,
  deleteReciterReducer,
  getPreviewReciterReducer,
  getReciterProfileReducer,
  getReciterReducer,
  listRecitersReducer,
  updateReciterReducer,
  uploadRecitationReducer,
} from "./slices/reciterSlice.js";
import {
  createMessageReducer,
  deleteMessageReducer,
  listMessagesReducer,
} from "./slices/messageSlice.js";
import {
  getFrequentRecitationReducer,
  listFrequentRecitationsReducer,
} from "./slices/FrequentRecitationsSlice.js";
import { updateReciter } from "./actions/reciterAction.js";

const rootReducers = combineReducers({
  login: userLoginReducer,
  listFrequentRecitations: listFrequentRecitationsReducer,
  getFrequentRecitation: getFrequentRecitationReducer,
  updateUserProfile: updateUserProfileReducer,
  getUserProfile: getUserProfileReducer,
  createReciter: createReciterReducer,
  getReciter: getReciterReducer,
  getPreviewReciter: getPreviewReciterReducer,
  updateReciter: updateReciterReducer,
  listReciters: listRecitersReducer,
  uploadRecitation: uploadRecitationReducer,
  listMessages: listMessagesReducer,
  createMessage: createMessageReducer,
  deleteMessage: deleteMessageReducer,
  getReciterProfile: getReciterProfileReducer,
  deleteReciter: deleteReciterReducer,
});

export default rootReducers;
