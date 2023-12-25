import axios from "axios";
import {
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFailure,
} from "../slices/userSlice";

export const updateUserProfile = (email, password) => async (dispatch) => {
  try {
    dispatch(updateUserProfileRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/auth/update-profile`,
      { email, password },
      config
    );

    dispatch(updateUserProfileSuccess(data));
    localStorage.setItem("user", JSON.stringify(data?.data));
  } catch (err) {
    dispatch(
      updateUserProfileFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserProfileRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/auth/get-profile`, config);

    dispatch(getUserProfileSuccess());
  } catch (err) {
    dispatch(
      getUserProfileFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
