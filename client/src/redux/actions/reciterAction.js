import {
  createReciterRequest,
  createReciterSuccess,
  createReciterFailure,
  listRecitersRequest,
  listRecitersSuccess,
  listRecitersFailure,
  getReciterRequest,
  getReciterSuccess,
  getReciterFailure,
  getReciterProfileRequest,
  getReciterProfileSuccess,
  getReciterProfileFailure,
  updateReciterRequest,
  updateReciterSuccess,
  updateReciterFailure,
  uploadRecitationRequest,
  uploadRecitationSuccess,
  uploadRecitationFailure,
  deleteReciterRequest,
  deleteReciterSuccess,
  deleteReciterFailure,
} from "./../slices/reciterSlice.js";
import axios from "axios";

export const listReciters =
  (recitationType = "", topReciters = "", keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(listRecitersRequest());

      const { data } = await axios.get(
        `/api/reciters/?recitationType=${recitationType}&topReciters=${topReciters}&keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch(listRecitersSuccess(data));
    } catch (err) {
      dispatch(
        listRecitersFailure(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const createReciter = (formData) => async (dispatch) => {
  try {
    dispatch(createReciterRequest());

    const config = {
      headers: {
        "Content-Type": "application/form-data",
      },
    };

    const { data } = await axios.post(`/api/reciters`, formData, config);
    dispatch(createReciterSuccess(data));
  } catch (err) {
    dispatch(
      createReciterFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getReciter = (slug) => async (dispatch) => {
  try {
    dispatch(getReciterRequest());

    const { data } = await axios.get(`/api/reciters/${slug}`);
    dispatch(getReciterSuccess(data));
  } catch (err) {
    dispatch(
      getReciterFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const updateReciter = (slug, formData) => async (dispatch) => {
  try {
    dispatch(updateReciterRequest());

    const config = {
      headers: {
        "Content-Type": "application/form-data",
      },
    };
    const { data } = await axios.put(`/api/reciters/${slug}`, formData, config);
    dispatch(updateReciterSuccess(data));
  } catch (err) {
    dispatch(
      updateReciterFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const uploadRecitation =
  (recitationType, reciterSlug, files) => async (dispatch) => {
    try {
      dispatch(uploadRecitationRequest());

      const config = {
        headers: {
          "Content-Type": "application/form-data",
        },
      };

      const formData = new FormData();
      formData.append("recitationType", recitationType);
      for (let i = 0; i < files.length; i++) {
        formData.append("audioFiles", files[i]);
      }

      const { data } = await axios.put(
        `/api/reciters/upload-recitation/${reciterSlug}`,
        formData,
        config
      );
      dispatch(uploadRecitationSuccess(data));
    } catch (err) {
      dispatch(
        uploadRecitationFailure(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const getReciterProfile = (slug) => async (dispatch) => {
  try {
    dispatch(getReciterProfileRequest());

    const { data } = await axios.get(`/api/reciters/reciter-profile/${slug}`);

    dispatch(getReciterProfileSuccess(data));
  } catch (err) {
    dispatch(
      getReciterProfileFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const deleteReciter = (slug) => async (dispatch) => {
  try {
    dispatch(deleteReciterRequest());

    const { data } = await axios.delete(`/api/reciters/${slug}`);

    dispatch(deleteReciterSuccess(data));
  } catch (err) {
    dispatch(
      deleteReciterFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
