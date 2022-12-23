import { Dossier } from "../screens/dossiers/types";
import { http } from "../utils/http";

export const signUp = async (data: any) => {
  return await http.post("auth/signup", data);
};

export const signIn = async (data: any) => {
  return await http.post("auth/login", data);
};

export const createDossier = async (data: Dossier) => {
  return await http.post("dossiers", data);
};

export const getDossiers = async () => {
  return await http.get("dossiers");
};

export const getDossierById = async (id: string) => {
  return await http.get(`dossiers/${id}`);
};
