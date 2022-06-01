import { changeProgressAction } from "./actions";
import {
  initNumberOfCompletion,
  initStatus,
  INumberOfCompletion,
  IStatus,
} from "./state";

// export const updateCircularProgress = (
//   state: INumberOfCompletion = initNumberOfCompletion,
//   action: changeProgressAction
// ): INumberOfCompletion => {
//   switch (action.type) {
//     case "@@PROGRESS/COMPLETED_SUCCESS":
//       return {
//         ...state,
//         numberOfCompleted: action.numberOfCompleted,
//       };
//     default:
//       return state;
//   }
// };
