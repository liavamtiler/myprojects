
const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;
export const updateListStatus= async (id:number) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/updateStatus`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // status,
      // itemId,
    }),
  });
  return resp;
};

export const updateProgress=async (progress: number, cid: number)=>{ 
  const resp = await fetch(
    `${REACT_APP_BACKEND_URL}/updateChecklistProgress/${cid}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress,cid
      }),
    }
  );
  return resp
}

// const {REACT_APP_BACKEND_URL}=process.env

export const updateStatus = async (status: string, itemId: number) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/updateStatus`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      itemId,
    }),
  });
  return resp;
};
/* updateUserLayer */
export const updateUserLayer = async (userLayer: number, userId: number) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/updateUserLayer`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userLayer,
      userId,
    }),
  });

  return resp;
};
