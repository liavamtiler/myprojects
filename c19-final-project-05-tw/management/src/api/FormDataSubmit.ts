import {
  CheckListfields,
  CheckListSubItemFields,
} from "../redux/submitForm/state";

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

/* AddProject */
export const addProjectInfo = async (
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
) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/addProject`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      projectCode,
      Location,
      contactPerson,
      type,
      EstimatedProjectCost,
      description,
      startDate,
      endDate,
      subConArr,
    }),
  });

  return resp;
};

/* Add Checklist Function */
export const addCheckList = async (
  list: Array<CheckListfields>,
  projectID: number
) => {
  /* [DEBUG] */

  const resp = await fetch(
    `${REACT_APP_BACKEND_URL}/addChecklist/${projectID}`,
    {
      method: "POST",
      /* Added Bearer */
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list,
        projectID,
      }),
    }
  );

  return resp;
};

/* AddSubItem Function  */
export const addSubItem = async (
  subItems: Array<CheckListSubItemFields>,
  listId: number
) => {
  /* [DEBUG] */
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/addSubItem`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subItems,
      listId,
    }),
  });
  // const result = resp.json();
  /* [DEBUG] */
  return resp;
};

export const uploadImageApi = async (
  image_path: string,
  subitem_id: string
) => {
  /* [DEBUG] */
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/uploadSubitemImage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_path,
      subitem_id,
    }),
  });
  /* [DEBUG] */
  return resp;
};
