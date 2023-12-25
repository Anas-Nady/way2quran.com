import {
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  getMessageRequest,
  getMessageSuccess,
  getMessageFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
  listMessagesRequest,
  listMessagesSuccess,
  listMessagesFailure,
} from "./../slices/messageSlice.js";
import axios from "axios";

export const createMessage = (name, email, content) => async (dispatch) => {
  try {
    dispatch(createMessageRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/messages`,
      { name, email, content },
      config
    );
    dispatch(createMessageSuccess(data));
  } catch (err) {
    dispatch(
      createMessageFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getMessage = (slug) => async (dispatch) => {
  try {
    dispatch(getMessageRequest());

    const { data } = await axios.get(`/api/messages/${slug}`);
    dispatch(getMessageSuccess(data));
  } catch (err) {
    dispatch(
      getMessageFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const listMessages =
  (pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(listMessagesRequest());

      const { data } = await axios.get(
        `/api/messages/?pageNumber=${pageNumber}`
      );
      dispatch(listMessagesSuccess(data));
    } catch (err) {
      dispatch(
        listMessagesFailure(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const deleteMessage = (slug) => async (dispatch) => {
  try {
    dispatch(deleteMessageRequest());

    const { data } = await axios.delete(`/api/messages/${slug}`);
    dispatch(deleteMessageSuccess(data));
  } catch (err) {
    dispatch(
      deleteMessageFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
