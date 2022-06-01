import {
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";

import { WriteListAction } from "./submitForm/actions";
import { writeListReducer } from "./submitForm/reducer";
import { ProjectFields, WriteListState } from "./submitForm/state";

import { authReducer, signUpReducer } from "./auth/reducer";
import { IAuthState, signUpState } from "./auth/state";
import { IAuthActions } from "./auth/actions";

import { changeProgressAction } from "./updateStatus/actions";
import { INumberOfCompletion } from "./updateStatus/state";
// import { updateCircularProgress } from "./updateStatus/reducer";

/* IRootState */
export interface IRootState {
  auth: IAuthState;
  // checkCompletion: INumberOfCompletion;
}

/*ROOT_ACTION */
export type RootActions = IAuthActions;

export const rootReducers = combineReducers<IRootState>({
  auth: authReducer,
  // checkCompletion: updateCircularProgress,
});

/* IRootThunkDispatch */
export type IRootThunkDispatch = ThunkDispatch<IRootState, null, RootActions>;

export default configureStore({ reducer: rootReducers });
