import { User } from "./state";

export const signUpSuccess = () => {
  return {
    type: "@@auth/signUp_Success" as const,
  };
};
export const signUpFail = () => {
  return {
    type: "@@auth/signUp_Fail" as const,
  };
};

/*  */
export function loginSuccess(token: string, userLayerName: string) {
  return {
    type: "@@Auth/LOGIN_SUCCESS" as const,
    token,
    userLayerName,
  };
}

export function loginFail() {
  return {
    type: "@@Auth/LOGIN_FAIL" as const,
  };
}

export type IAuthActions =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFail>
  | ReturnType<typeof signUpSuccess>
  | ReturnType<typeof signUpFail>;
