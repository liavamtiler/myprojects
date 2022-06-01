import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import {
  addCheckList,
  addProjectInfo,
  addSubItem,
  uploadImageApi,
} from "../../api/FormDataSubmit";
import { ROUTES } from "../../components/Routers";
import {
  successAddProject,
  successWriteList,
  successWriteListSubitem,
} from "./actions";
import { CheckListfields, CheckListSubItemFields } from "./state";

/*addProjectThunk  */
export function addProjectThunk(
  title: string,
  projectCode: string,
  Location: string,
  contactPerson: string,
  type: string,
  EstimatedProjectCost: string,
  description: string,
  startDate: string,
  endDate: string,
  subConArr: any
) {
  return async (dispatch: Dispatch) => {
    const resp = await addProjectInfo(
      title,
      projectCode,
      Location,
      contactPerson,
      type,
      EstimatedProjectCost,
      description,
      startDate,
      endDate,
      subConArr
    );
    console.log(resp);
    dispatch(successAddProject());
  };
}

/* AddCheckListThunk */
export function addCheckListThunk(
  list: Array<CheckListfields>,
  projectID: number,
  navigate: NavigateFunction
) {
  return async (dispatch: Dispatch) => {
    const resp = await addCheckList(list, projectID);
    if (resp.status !== 200) {
      return alert("Please Check again");
    }

    if (resp.status === 200) {
      dispatch(successWriteList());
      navigate("/");
      return;
    }
  };
}

/* For AddSubitem  Function */
export function addSubItemThunk(
  subItem: Array<CheckListSubItemFields>,
  // navigate: NavigateFunction,
  listId: number
) {
  return async (dispatch: Dispatch) => {
    const resp = await addSubItem(subItem, listId);

    /* DEBUG */
    if (resp.status !== 200) {
      return alert("Please Check fields again");
    }
    if (resp.status === 200) {
      dispatch(successWriteListSubitem());
      /* [DEBUG] */
      // navigate("/projectDetail");
      return;
    }
  };
}

export function uploadImageThunk(
  imageList: string,
  sid: string,
  navigate: NavigateFunction
) {
  return async (dispatch: Dispatch) => {
    const resp = await uploadImageApi(imageList, sid);
    if (resp.status !== 200) {
      return alert("Please Check again");
    }

    if (resp.status === 200) {
      dispatch(successWriteList());
      navigate("/");
      return;
    }
  };
}
