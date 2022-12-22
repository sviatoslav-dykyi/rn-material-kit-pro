import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_BASE_URL } from "../constants/utils";

const getToken = async () => {
  let token;
  try {
    token = await AsyncStorage.getItem("token");
  } catch (e) {
    console.log("Error when reading token from AsyncStorage");
  }
  return token;
};

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
};
