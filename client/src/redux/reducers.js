import { combineReducers } from "@reduxjs/toolkit";
import { userLoginReducer } from "./slices/authSlices";

import {
  getUserProfileReducer,
  updateUserProfileReducer,
} from "./slices/userSlice";
import {
  createReciterReducer,
  deleteReciterRecitationReducer,
  deleteReciterReducer,
  deleteReciterSurahReducer,
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
} from "./slices/frequentRecitationsSlice.js";

const rootReducers = combineReducers({
  login: userLoginReducer,
  listFrequentRecitations: listFrequentRecitationsReducer,
  getFrequentRecitation: getFrequentRecitationReducer,
  updateUserProfile: updateUserProfileReducer,
  getUserProfile: getUserProfileReducer,
  createReciter: createReciterReducer,
  getReciter: getReciterReducer,
  updateReciter: updateReciterReducer,
  listReciters: listRecitersReducer,
  uploadRecitation: uploadRecitationReducer,
  listMessages: listMessagesReducer,
  createMessage: createMessageReducer,
  deleteMessage: deleteMessageReducer,
  getReciterProfile: getReciterProfileReducer,
  deleteReciter: deleteReciterReducer,
  deleteReciterRecitation: deleteReciterRecitationReducer,
  deleteReciterSurah: deleteReciterSurahReducer,
});

export default rootReducers;
