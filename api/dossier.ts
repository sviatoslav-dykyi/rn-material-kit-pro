import { Dossier } from "../screens/dossiers/types";
import { http } from "../utils/http";

export const createDossier = async (data: Dossier) => {
  return await http.post("dossiers", data);
};

export const editDossier = async (data: Dossier) => {
  return await http.put(`dossiers/${data.id}`, data);
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

export const getSocioEconomicData = async (id: string, data: any) => {
  return await http.post(`/dossiers/socio-economics/${id}`, data);
};

// export const uploadImage = async (image: File) => {
//   return await http.post(`/dossiers/images`, data);
// };
