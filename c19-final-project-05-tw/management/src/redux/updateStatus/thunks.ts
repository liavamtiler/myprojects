import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import {
  updateProgress,
  updateStatus,
  updateUserLayer,
} from "../../api/changeStatus";

export function changeStatusThunk(status: string, itemId: number) {
  /* [DEBUG] */

  return async (dispatch: Dispatch) => {
    const resp = await updateStatus(status, itemId);
    const result = await resp.json();
    console.log(result);
  };
}

export function updateProgressThunk(progress: number, cid: number) {
  /* [DEBUG] */
  return async (dispatch: Dispatch) => {
    const resp = await updateProgress(progress, cid);
    const result = await resp.json();
    console.log(result);
  };
}

export function changeUserLayer(userLayer: number, userId: number) {
  return async (dispatch: Dispatch) => {
    const resp = await updateUserLayer(userLayer, userId);
    const result = await resp.json();
    console.log(result);
  };
}
