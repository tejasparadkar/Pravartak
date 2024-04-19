export const SET_TOKEN = "SET_TOKEN";
export const SET_ROLE = "SET_Role";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const SET_ID = "SET_ID";
export const SET_NAME = "SET_NAME";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setId = (id: string) => ({
  type: SET_ID,
  payload: id,
});

export const setRole = (role: string) => ({
  type: SET_ROLE,
  payload: role,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
