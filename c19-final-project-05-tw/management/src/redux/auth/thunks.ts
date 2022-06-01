import { signUpFail, signUpSuccess } from "./actions";

import { signUp } from "../../api/user";
import { ROUTES } from "../../components/Routers";

import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { getUserInfo, login } from "../../api/user";
import { loginFail, loginSuccess } from "./actions";

export function signUpThunk(
  username: string,
  password: string,
  email: string,
  company: string,
  navigate: NavigateFunction
) {
  /* [DEBUG] */
  return async (dispatch: Dispatch) => {
    const resp = await signUp(username, password, email, company);
    if (resp.status === 401) {
      /* [DEBUG] */
      return dispatch(signUpFail());
    }
    if (resp.status === 200) {
      /* [DEBUG] */
      dispatch(signUpSuccess());
      navigate(ROUTES.LOGIN);
      return;
    }
  };
}

export function loginThunk(
  username: string,
  password: string,
  navigate: NavigateFunction
) {
  return async (dispatch: Dispatch) => {
    const result = await login(username, password);
    if (result.token) {
      localStorage.setItem("token", result.token);

      dispatch(loginSuccess(result.token, result.user_layer_name));
      navigate("/");
    } else {
      alert("username and password incorrect");
      dispatch(loginFail());
    }
  };
}

export function restoreLoginThunk(navigate: NavigateFunction) {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(loginFail());
      return;
    }

    const result = await getUserInfo(token);

    if (result.error) {
      dispatch(loginFail());
    } else {
      dispatch(loginSuccess(token, result.user_layer_name));
      navigate("/");
    }
  };
}

export function logoutThunk() {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("token");
    dispatch(loginFail());
  };
}
