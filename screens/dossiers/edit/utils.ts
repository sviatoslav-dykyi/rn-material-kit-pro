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
  // formData.append("numberOfUnits", "1");

  // formData.append("userDefinedFields[0][label]", "Test");
  // formData.append("userDefinedFields[0][value]", "Yes" || "");
  // //formData.append("logo", dossier.logo || "");
  // // @ts-ignore
  // //formData.append("rent", 1);
  // const URL =
  //   "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5eec2bd9-c930-4bcf-a475-a9ada880e6ed.png";

  // formData.append("countryCode", "DE");
  // console.log("dossier.images333333", dossier.images);
  // const image = {
  //   uri: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5eec2bd9-c930-4bcf-a475-a9ada880e6ed.png",
  //   type: "image/jpeg",
  //   name: "myImage" + "-" + Date.now() + ".jpg",
  // };
  // formData.append("images", image);

  // formData.append("images", [
  //   { uri: imgU, name: "media", type: `image/jpeg` },
  // ] as any);
  // formData.append("images", {
  //   uri: imgU,
  //   name: "media",
  //   type: `image/jpeg`,
  // } as any);
  const tt = async () => {
    const fetchResponse = await fetch(
      "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5eec2bd9-c930-4bcf-a475-a9ada880e6ed.png"
    );
    //console.log("fetchResponse", fetchResponse);
    const blob = await fetchResponse.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    //console.log("blob", blob);

    // formData.append("images[]", {
    //   uri: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5eec2bd9-c930-4bcf-a475-a9ada880e6ed.png",
    //   name: "media",
    //   type: `image/png`,
    // } as any);
    formData.append("images[]", file as any);
    console.log("done with files2");
  };

  await tt();

  // const request = new XMLHttpRequest();
  // request.responseType = "blob";
  // request.onload = function () {
  //   console.log("request.response", request.response);
  //   //formData.append("imageFile", request.response);
  // };
  // request.open("GET", URL);
  // request.send();
  // formData.append("images", dossier.images.toString());
  // formData.append("attachments", dossier.attachments.toString() || "");
  //console.log("wwwwwwwww", formData);
  return formData;
};

// const testData: any = {
//   title: "My Lambda Dossier",
//   description: "My description",
//   dealType: "rent",
//   property: {
//     location: {
//       address: {
//         postCode: 81700, // *
//         city: "safsf", // *
//         street: "dsadsad", // *
//         houseNumber: 23,
//       }, // *},
//       coordinates: {
//         latitude: 12,
//         longitude: 33,
//       },
//     },
//     propertyType: {
//       code: "house",
//       subcode: "house_detached",
//     },
//     buildingYear: "1990",
//     livingArea: "100.00",
//     landArea: "900.00",
//     volume: "900.00",
//     numberOfRooms: "3",
//     numberOfBathrooms: "1",
//     numberOfIndoorParkingSpaces: "0",
//     numberOfOutdoorParkingSpaces: "0",
//     hasPool: "true",
//     condition: {
//       bathrooms: "renovation_needed",
//       kitchen: "renovation_needed",
//       flooring: "well_maintained",
//       windows: "new_or_recently_renovated",
//     },
//     quality: {
//       bathrooms: "simple",
//       kitchen: "normal",
//       flooring: "high_quality",
//       windows: "luxury",
//     },
//   },
//   userDefinedFields: [{ label: "Extra garage", value: "Yes" }],
//   logo: "cf4595d3-b56f-4b38-8f54-c29ae9ae078e.png",
//   countryCode: "DE",
//   imagesCaptions: ["caption1", "caption2"],
// };
const imgU =
  "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5eec2bd9-c930-4bcf-a475-a9ada880e6ed.png";
