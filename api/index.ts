import { Dossier } from "../screens/dossiers/types";
import { ForgotPassword, ResetPassword } from "../types/auth";

import { User } from "../types/user";

import { http } from "../utils/http";

export const signUp = async (data: any) => {
  return await http.post("auth/signup", data);
};

export const signIn = async (data: any) => {
  return await http.post("auth/login", data);
};

export const confirmMail = async (code: string) => {
  return await http.get(`auth/confirmMail/${code}`);
};

export const confirmPhone = async (code: string) => {
  return await http.get(`auth/confirmPhone/${code}`);
};

export const resetPassword = async (code: string, data: ResetPassword) => {
  return await http.patch(`auth/resetpassword/${code}`, data);
};

export const forgotPassword = async (data: ForgotPassword) => {
  return await http.patch("/auth/forgotpassword", data);
};

export const getMe = async () => {
  return await http.get("/users/me");
};

export const updateUser = async (data: User) => {
  return await http.patch(`users/${data.id}`, data);
};

export const resendPhoneCode = async (data: { phone: "string" }) => {
  return await http.post("auth/resend-phonecode", data);
};

export const resendEmailCode = async (data: { email: "string" }) => {
  return await http.post("auth/resend-emailcode", data);
};
