export interface User {
  id: number;
  username: string;
}
/* For Login Logic, includes the following  */
export interface IAuthState {
  isAuthenticated: boolean | null;
  token: string | null;
  userLayerName: string | null;
  username: string| null;
}

export const initialAuthState: IAuthState = {
  isAuthenticated: null,
  token: null,
  userLayerName: null,
  username: null
};

export interface signUpState {
  isSignUp: boolean /* user signUp後,轉頁logic */;
}

export const initSignUpUser: signUpState = {
  isSignUp: false,
};

/*  */
