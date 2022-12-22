import { getDossiers } from "../../api";

export const fetchDossiers = async ({ setDossiers }: any) => {
  const response = await getDossiers();
  const json = await response.json();
  console.log("json", json);
  if ([200, 201].includes(response.status)) {
    const { dossiers } = json;
    setDossiers(dossiers);
  }
};
