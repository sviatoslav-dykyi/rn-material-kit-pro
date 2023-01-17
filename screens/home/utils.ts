import { getDossiers } from "../../api/dossier";

export const fetchDossiers = async ({
  params,
  setDossiers,
  setIsLoading,
}: any) => {
  setIsLoading(true);
  const response = await getDossiers(params);
  const json = await response.json();
  if ([200, 201].includes(response.status)) {
    const { dossiers } = json;
    setDossiers(dossiers);
  }
  setIsLoading(false);
};
