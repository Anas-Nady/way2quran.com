import { combineReducers } from "@reduxjs/toolkit";
import { userLoginReducer } from "./slices/authSlices";

import {
  getUserProfileReducer,
  updateUserProfileReducer,
} from "./slices/userSlice";
import {
  createReciterReducer,
  deleteReciterReducer,
  getReciterProfileReducer,
  getReciterReducer,
  listRecitersReducer,
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

const rootReducers = combineReducers({
  login: userLoginReducer,
  frequentRecitations: listFrequentRecitationsReducer,
  getFrequentRecitation: getFrequentRecitationReducer,
  updateUserProfile: updateUserProfileReducer,
  getUserProfile: getUserProfileReducer,
  createReciter: createReciterReducer,
  getReciter: getReciterReducer,
  listReciters: listRecitersReducer,
  listMessages: listMessagesReducer,
  createMessage: createMessageReducer,
  deleteMessage: deleteMessageReducer,
  getReciterProfile: getReciterProfileReducer,
  deleteReciter: deleteReciterReducer,
});

export default rootReducers;
