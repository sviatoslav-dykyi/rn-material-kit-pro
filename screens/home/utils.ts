import { getDossiers } from "../../api/dossier";
import { DossierLocation } from "../dossiers/types";

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

export const extractFullAddress = ({
  address: { street, houseNumber, city, postCode },
}: DossierLocation): string => `${street} ${houseNumber}, ${city}, ${postCode}`;
