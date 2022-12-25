import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_BASE_URL } from "../constants/utils";
import { getToken } from "./common";
import { ContentTypeMIME } from "./constants";

export const http = {
  post: async (endpoint: string, body = {}) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  },
  postFormData: async (endpoint: string, body: FormData) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": ContentTypeMIME.MULTIPART_FORM_DATA,
        Authorization: `Bearer ${token}`,
      },
      body,
    });
  },
  get: async (endpoint: string) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: async (endpoint: string) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  put: async (endpoint: string, body: FormData) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": ContentTypeMIME.MULTIPART_FORM_DATA,
        Authorization: `Bearer ${token}`,
      },
      body,
    });
  },
  patch: async (endpoint: string, body = {}) => {
    const token = await getToken();
    return fetch(`${REACT_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  },
};
