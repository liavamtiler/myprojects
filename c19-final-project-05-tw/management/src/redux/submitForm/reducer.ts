import { WriteListAction } from "./actions";
import { initWriteListState, WriteListState } from "./state";

export const writeListReducer = (
  state: WriteListState = initWriteListState,
  action: WriteListAction
): WriteListState => {
  switch (action.type) {
    case "@@SUCCESS_WriteList":
      return {
        ...state,
        isWrote: true,
      };
    default:
      return state;
  }
};
export const addProjectReducer = (
  state: WriteListState = initWriteListState,
  action: WriteListAction
): WriteListState => {
  switch (action.type) {
    case "@@SUCCESS_WriteList":
      return {
        ...state,
        isWrote: true,
      };
    default:
      return state;
  }
};
