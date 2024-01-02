import {
  listFrequentRecitationsRequest,
  listFrequentRecitationsSuccess,
  listFrequentRecitationsFailure,
  getFrequentRecitationRequest,
  getFrequentRecitationSuccess,
  getFrequentRecitationFailure,
} from "./../slices/frequentRecitationsSlice";
import axios from "axios";

export const listFrequentRecitations = () => async (dispatch) => {
  try {
    dispatch(listFrequentRecitationsRequest());

    const { data } = await axios.get(`/api/frequent-recitations`);
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

    const { data } = await axios.get(`/api/frequent-recitations/${id}`);
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
