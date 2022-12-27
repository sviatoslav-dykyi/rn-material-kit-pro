import { getDossiers } from "../../api";

export const fetchDossiers = async ({ setDossiers, setIsLoading }: any) => {
  setIsLoading(true);
  const response = await getDossiers();
  const json = await response.json();
  if ([200, 201].includes(response.status)) {
    const { dossiers } = json;
    setDossiers(dossiers);
  }
  setIsLoading(false);
};
