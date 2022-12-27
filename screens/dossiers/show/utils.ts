import { getSocioEconomicData } from "../../../api";
import { ShowPageTabs } from "./types";

export const fetchSocioEconomicData = async ({
  setSocioEconomic,
  setSocioEconomicLoading,
  id,
}: any) => {
  setSocioEconomicLoading(true);
  const response = await getSocioEconomicData(id, {
    type: "population_size",
    divisionsLevel8: ["147130000000"],
    years: {
      min: 2000,
      max: 2100,
    },
    countryCode: "DE",
  });
  const json = await response.json();
  console.log("json", json);
  if ([200, 201].includes(response.status)) {
    const { data } = json;
    //console.log("data3", data);
    setSocioEconomic(data);
    // const { dossiers } = json;
    // setDossiers(dossiers);
    setSocioEconomicLoading(false);
  }
  setSocioEconomicLoading(false);
};

export const showPageTabs: {
  value: ShowPageTabs;
  label: string;
  icon: string;
}[] = [
  {
    value: "overview",
    label: "Overview",
    icon: "info-with-circle",
  },
  {
    value: "socio-economics",
    label: "Socio-Economics",
    icon: "users",
  },
];

export const SWOW_RATING_REVIEW_SIZE = 10;

export const SHOW_RATING_SIZE = 12;
