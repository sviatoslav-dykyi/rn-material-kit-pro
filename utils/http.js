import { REACT_BASE_URL } from "../constants/utils";

export const http = {
  post: (endpoint, body = {}) => {
    console.log("body", body);
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  get: (endpoint) => {
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
