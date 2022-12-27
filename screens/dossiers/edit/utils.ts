import { FormikValues } from "formik";
import { createDossier, editDossier, getDossierById } from "../../../api";
import { removeEmptyString } from "../form/utils";

import { Dossier } from "../types";

export const fetchDossier = async ({ setDossier, setIsLoading, id }: any) => {
  setIsLoading(true);
  const response = await getDossierById(id);
  const json = await response.json();

  if ([200, 201].includes(response.status)) {
    const { dossier } = json;
    setDossier(dossier);
    // const { dossiers } = json;
    // setDossiers(dossiers);
    setIsLoading(false);
  }
  setIsLoading(false);
};

export const handleEditDossierSubmit = () => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    if (!dossier._id) return;
    setSubmitting(true);
    //console.log("dossier2222", dossier);
    const auxDossier = await prepareDossierBeforeSubmit(dossier);

    //console.log("auxDossier", auxDossier);
    //const response = await editDossier(auxDossier, dossier._id);
    const response = await editDossier(auxDossier, dossier._id);
    const json = await response.json();
    console.log("json", json);
    if ([200, 201].includes(response.status)) {
      console.log("json445", json);
    }

    setSubmitting(false);
  };
};

const prepareDossierBeforeSubmit = async (
  dossier: Dossier
): Promise<FormData> => {
  const formData = new FormData();
  console.log("dossier.images", dossier);
  formData.append("title", dossier.title || "");
  dossier.description && formData.append("description", dossier.description);
  dossier.dealType && formData.append("dealType", dossier.dealType);
  formData.append(
    "property[location][address][postCode]",
    dossier.property.location.address.postCode
  );
  formData.append(
    "property[location][address][city]",
    dossier.property.location.address.city
  );
  formData.append(
    "property[location][address][street]",
    dossier.property.location.address.street
  );
  formData.append(
    "property[location][address][houseNumber]",
    dossier.property.location.address.houseNumber
  );
  formData.append(
    "property[location][coordinates][latitude]",
    dossier.property.location.coordinates.latitude.toString()
  );
  formData.append(
    "property[location][coordinates][longitude]",
    dossier.property.location.coordinates.longitude.toString()
  );
  dossier.property.propertyType.code &&
    formData.append(
      "property[propertyType][code]",
      dossier.property.propertyType.code
    );
  dossier.property.propertyType.subcode &&
    formData.append(
      "property[propertyType][subcode]",
      dossier.property.propertyType.subcode
    );
  dossier.property.buildingYear &&
    formData.append(
      "property[buildingYear]",
      dossier.property.buildingYear.toString()
    );
  dossier.property.renovationYear &&
    formData.append(
      "property[renovationYear]",
      dossier.property.renovationYear.toString()
    );
  dossier.property.livingArea &&
    formData.append(
      "property[livingArea]",
      dossier.property.livingArea?.toString()
    );
  dossier.property.landArea &&
    formData.append(
      "property[landArea]",
      dossier.property.landArea?.toString()
    );
  dossier.property.volume &&
    formData.append(
      "property[volume]",
      dossier.property.volume?.toString() || ""
    );
  dossier.property.balconyArea &&
    formData.append(
      "property[balconyArea]",
      dossier.property.balconyArea?.toString()
    );
  dossier.property.hasLift !== "" &&
    dossier.property.hasLift !== undefined &&
    formData.append("property[hasLift]", String(dossier.property.hasLift));
  dossier.property.isNew !== "" &&
    dossier.property.isNew !== undefined &&
    formData.append("property[isNew]", String(dossier.property.isNew));
  dossier.property.hasSauna !== "" &&
    dossier.property.hasSauna !== undefined &&
    formData.append("property[hasSauna]", String(dossier.property.hasSauna));
  dossier.property.hasPool !== "" &&
    dossier.property.hasPool !== undefined &&
    formData.append("property[hasPool]", String(dossier.property.hasPool));
  dossier.property.floorNumber &&
    formData.append(
      "property[floorNumber]",
      dossier.property.floorNumber?.toString()
    );
  dossier.property.numberOfUnits &&
    formData.append(
      "property[numberOfUnits]",
      dossier.property.numberOfUnits?.toString()
    );
  dossier.property.annualRentIncome &&
    formData.append(
      "property[annualRentIncome]",
      dossier.property.annualRentIncome?.toString()
    );
  dossier.property.numberOfFloorsInBuilding &&
    formData.append(
      "property[numberOfFloorsInBuilding]",
      dossier.property.numberOfFloorsInBuilding?.toString()
    );
  dossier.property.annualRentIncome &&
    formData.append(
      "property[annualRentIncome]",
      dossier.property.annualRentIncome?.toString()
    );

  dossier.property.numberOfRooms &&
    formData.append(
      "property[numberOfRooms]",
      dossier.property.numberOfRooms?.toString()
    );
  dossier.property.numberOfBathrooms &&
    formData.append(
      "property[numberOfBathrooms]",
      dossier.property.numberOfBathrooms?.toString()
    );
  dossier.property.numberOfIndoorParkingSpaces &&
    formData.append(
      "property[numberOfIndoorParkingSpaces]",
      dossier.property.numberOfIndoorParkingSpaces?.toString()
    );
  dossier.property.numberOfOutdoorParkingSpaces &&
    formData.append(
      "property[numberOfOutdoorParkingSpaces]",
      dossier.property.numberOfOutdoorParkingSpaces?.toString()
    );
  dossier.property.condition?.bathrooms &&
    formData.append(
      "property[condition][bathrooms]",
      dossier.property.condition?.bathrooms
    );
  dossier.property.condition?.kitchen &&
    formData.append(
      "property[condition][kitchen]",
      dossier.property.condition?.kitchen
    );
  dossier.property.condition?.flooring &&
    formData.append(
      "property[condition][flooring]",
      dossier.property.condition?.flooring
    );
  dossier.property.condition?.windows &&
    formData.append(
      "property[condition][windows]",
      dossier.property.condition?.windows
    );
  dossier.property.condition?.overall &&
    formData.append(
      "property[condition][overall]",
      dossier.property.condition?.overall
    );
  dossier.property.quality?.bathrooms &&
    formData.append(
      "property[quality][bathrooms]",
      dossier.property.quality?.bathrooms || ""
    );
  dossier.property.quality?.kitchen &&
    formData.append(
      "property[quality][kitchen]",
      dossier.property.quality?.kitchen || ""
    );
  dossier.property.quality?.flooring &&
    formData.append(
      "property[quality][flooring]",
      dossier.property.quality?.flooring || ""
    );
  dossier.property.quality?.windows &&
    formData.append(
      "property[quality][windows]",
      dossier.property.quality?.windows || ""
    );
  dossier.property.quality?.overall &&
    formData.append(
      "property[quality][overall]",
      dossier.property.quality?.overall
    );
  dossier.property.gardenArea &&
    formData.append(
      "property[gardenArea]",
      dossier.property.gardenArea.toString()
    );
  dossier.property.energyLabel &&
    formData.append(
      "property[energyLabel]",
      dossier.property.energyLabel.toString()
    );
  dossier.property.garage_spaces &&
    formData.append(
      "property[garage_spaces]",
      dossier.property.garage_spaces.toString()
    );
  dossier.property?.numberOfUnits &&
    formData.append(
      "property[numberOfUnits]",
      dossier.property?.numberOfUnits.toString()
    );

  // formData.append("images", [
  //   { uri: imgU, name: "media", type: `image/jpeg` },
  // ] as any);

  // [
  //   {
  //     filename: "IMG_0002.jpg",
  //     height: 2848,
  //     url: "file:///Users/svatoslav_dykyi/Library/Developer/CoreSimulator/Devices/498DC804-6C82-4F7A-8527-CCB85A85A539/data/Containers/Data/Application/BF22C133-E58C-4088-A097-4244E1D8284C/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-material-kit-pro-d93fccf4-4f79-48c5-aec9-0ac23d29924e/ImagePicker/A4B3ACE2-0704-4AC2-BAD5-26B0406E5C4F.jpg",
  //     width: 4288,
  //   },
  //   {
  //     filename: "IMG_0001.jpg",
  //     height: 2848,
  //     url: "file:///Users/svatoslav_dykyi/Library/Developer/CoreSimulator/Devices/498DC804-6C82-4F7A-8527-CCB85A85A539/data/Containers/Data/Application/BF22C133-E58C-4088-A097-4244E1D8284C/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-material-kit-pro-d93fccf4-4f79-48c5-aec9-0ac23d29924e/ImagePicker/5E52D3C3-71A4-488F-989F-62B01E4972DC.jpg",
  //     width: 4288,
  //   },
  // ];

  const urlToBlob = async () => {
    dossier.images.forEach(async ({ filename, url }) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], filename || "image.jpg", {
        type: blob.type,
      });
      formData.append("images[]", file as any);
    });
  };
  await urlToBlob();

  return formData;
};
