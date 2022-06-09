const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;
console.log(REACT_APP_BACKEND_URL);

export const signUp = async (
  username: string,
  password: string,
  email: string,
  company: string
) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
      company,
    }),
  });
  return resp;
};

/*  */
export const login = async (username: string, password: string) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return resp.json();
};

export const getUserInfo = async (token: string) => {
  const resp = await fetch(`${REACT_APP_BACKEND_URL}/userInfo`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return resp.json();
};
