import { IAuthActions } from "./actions";
import {
  IAuthState,
  initialAuthState,
  initSignUpUser,
  signUpState,
} from "./state";

import produce from "immer";

export const authReducer = produce(
  (state: IAuthState, action: IAuthActions) => {
    switch (action.type) {
      case "@@Auth/LOGIN_SUCCESS":
        state.isAuthenticated = true;
        state.token = action.token;
        state.userLayerName = action.userLayerName;
        return;
      case "@@Auth/LOGIN_FAIL":
        state.isAuthenticated = false;
        return;
      default:
        return;
    }
  },
  initialAuthState
);

/*  */
export const signUpReducer = (
  state: signUpState = initSignUpUser,
  action: IAuthActions
): signUpState => {
  switch (action.type) {
    case "@@auth/signUp_Success":
      return {
        ...state,
        isSignUp: true,
      };
    case "@@auth/signUp_Fail":
      return {
        ...state,
        isSignUp: false,
      };
    default:
      return state;
  }
};
