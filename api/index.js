import { http } from "../utils/http";

export const signUp = async (data) => {
  return await http.post("auth/signup", data);
};

export const signIn = async (data) => {
  return await http.post("auth/login", data);
};
