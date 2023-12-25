import axios from "axios";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} from "./../slices/authSlices.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/auth/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("user", JSON.stringify(data?.user));
  } catch (error) {
    dispatch(
      userLoginFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  await axios.get("/api/auth/logout");
  dispatch(userLogout());
};
