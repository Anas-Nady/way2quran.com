import {
  listFrequentRecitationsRequest,
  listFrequentRecitationsSuccess,
  listFrequentRecitationsFailure,
  getFrequentRecitationRequest,
  getFrequentRecitationSuccess,
  getFrequentRecitationFailure,
} from "../slices/FrequentRecitationsSlice";
import axios from "axios";

export const listFrequentRecitations =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(listFrequentRecitationsRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/frequent-recitations?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      console.log(data);
      dispatch(listFrequentRecitationsSuccess(data));
    } catch (error) {
      dispatch(
        listFrequentRecitationsFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const getFrequentRecitations = (id) => async (dispatch) => {
  try {
    dispatch(getFrequentRecitationRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/frequent-recitations/${id}`, config);
    dispatch(getFrequentRecitationSuccess(data));
  } catch (error) {
    dispatch(
      getFrequentRecitationFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
