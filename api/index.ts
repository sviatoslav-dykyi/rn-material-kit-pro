import { Dossier } from "../screens/dossiers/types";
import { ForgotPassword, ResetPassword } from "../screens/forgotPassword/types";
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

export const resetPassword = async (code: string, data: ResetPassword) => {
  return await http.patch(`auth/resetpassword/${code}`, data);
};

export const forgotPassword = async (data: ForgotPassword) => {
  return await http.patch("/auth/forgotpassword", data);
};

export const createDossier = async (data: FormData) => {
  return await http.postFormData("dossiers", data);
};

export const editDossier = async (data: FormData, id: string) => {
  return await http.put(`dossiers/${id}`, data);
};

export const getDossiers = async () => {
  return await http.get("dossiers");
};

export const getDossierById = async (id: string) => {
  return await http.get(`dossiers/${id}`);
};

export const deleteDossier = async (id: string) => {
  return await http.delete(`dossiers/${id}`);
};

export const getMe = async () => {
  return await http.get("/users/me");
};

export const updateUser = async (data: User) => {
  return await http.patch(`users/${data.id}`);
};

export const getSocioEconomicData = async (id: string, data: any) => {
  return await http.post(`/dossiers/socio-economics/${id}`, data);
};
