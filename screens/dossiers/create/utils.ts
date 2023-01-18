import { FormikValues } from "formik";
import { createDossier } from "../../../api/dossier";
import { DossierTypes } from "../../../utils/constants";
import { initSignInValues } from "../../signIn/utils";
import { Dossier } from "../types";

export const handleCreateDossierSubmit = ({ navigation }: any) => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched, resetForm }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);

    const clone = JSON.parse(JSON.stringify(dossier));
    const result = prepareBeforeFormJsonDara(clone);
    //console.log()
    console.log("finally before submission", result);

    //console.log("condition", result.property.condition);
    const response = await createDossier(result);
    const json = await response.json();
    console.log("json.dossier.property", json.dossier.property);
    if ([200, 201].includes(response.status)) {
      setSubmitting(false);
      navigation.navigate("Home");
      //setValues(initCreateDossier);
    } else {
      setSubmitting(false);
    }
  };
};

export const prepareBeforeFormJsonDara = (dossier: Dossier) => {
  const clone: any = { ...dossier };
  removeEmptyString(clone);
  if (clone.property.propertyType.code === "apartment")
    delete clone.property.landArea;
  return clone;
};

function removeEmptyString(object: any) {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === "object") removeEmptyString(value);
    if (value === null || value === undefined || value === "") {
      if (Array.isArray(object)) object.splice(key as any, 1);
      else delete object[key];
    }
  });
  return object;
}

function removeEmptyArrays(data: any) {
  for (var key in data) {
    var item = data[key];
    // see if this item is an array
    if (Array.isArray(item)) {
      // see if the array is empty
      if (item.length == 0) {
        // remove this item from the parent object
        delete data[key];
      }
      // if this item is an object, then recurse into it
      // to remove empty arrays in it too
    } else if (typeof item == "object") {
      removeEmptyArrays(item);
    }
  }
}
// export const;

export const initCreateDossier: Dossier = {
  title: "",
  dealType: "",
  description: "",
  property: {
    buildingYear: "",
    location: {
      address: {
        city: "",
        houseNumber: "",
        postCode: "",
        street: "",
      },
      coordinates: { latitude: 0, longitude: 0 },
    },
    propertyType: {
      code: DossierTypes.APARTMENT,
    },
    hasLift: false,
    isNew: false,
    hasSauna: false,
    hasPool: false,
  },
  images: [],
  userDefinedFields: [],
  attachments: [],
  countryCode: "DE",
};

// export const prepareDossierBeforeSubmit = (data: Dossier): Dossier => {
//   const auxDossier: any = {};
//   Object.keys(data).forEach((key: any) => {
//     if (data[key as keyof Dossier]) {
//       auxDossier[key as keyof Dossier] = data[key as keyof Dossier];
//     }
//   });
//   return {
//     ...data,
//     title: data.title ?? "",
//     dealType: data.dealType ?? "",
//     property: {
//       ...data.property,
//       balconyArea: data.property.balconyArea?.toString() ?? "",
//       buildingYear: data.property.buildingYear.toString() ?? "",
//       floorNumber: data.property.floorNumber?.toString() ?? "",
//       gardenArea: data.property.gardenArea?.toString() ?? "",
//       livingArea: data.property.livingArea?.toString() ?? "",
//       numberOfBathrooms: data.property.numberOfBathrooms?.toString() ?? "",
//       numberOfFloorsInBuilding:
//         data.property.numberOfFloorsInBuilding?.toString() ?? "",
//       numberOfIndoorParkingSpaces:
//         data.property.numberOfIndoorParkingSpaces?.toString() ?? "",
//       numberOfOutdoorParkingSpaces:
//         data.property.numberOfOutdoorParkingSpaces?.toString() ?? "",
//       numberOfRooms: data.property.numberOfRooms?.toString() ?? "",
//       renovationYear: data.property.renovationYear?.toString() ?? "",
//     },
//   };
// };

const mockData2 = {
  //description: "My description",
  //dealType: "rent",
  countryCode: "DE",
  //askingSalePrice: 223,
  property: {
    location: {
      address: {
        postCode: "8037",
        city: "Zurich",
        street: "Nordstrasse",
        houseNumber: "391",
      },
      coordinates: {
        latitude: "47.3968601",
        longitude: "8.5153549",
      },
    },
    propertyType: {
      code: "apartment",
    },
    //numberOfUnits: 12,
    buildingYear: "1990",
    livingArea: "100.00",
    // numberOfRooms: "3",
    // numberOfBathrooms: "1",
    // numberOfIndoorParkingSpaces: "0",
    // numberOfOutdoorParkingSpaces: "0",
    // hasPool: "true",
    condition: {
      // bathrooms: "renovation_needed",
      // kitchen: "renovation_needed",
      // flooring: "well_maintained",
      // windows: "new_or_recently_renovated",
    },
    quality: {
      // bathrooms: "simple",
      // kitchen: "normal",
      // flooring: "high_quality",
      // windows: "luxury",
    },
    // userDefinedFields: [
    //   {
    //     label: "Extra garage",
    //     value: "Yes",
    //   },
    // ],
    // logo: "cf4595d3-b56f-4b38-8f54-c29ae9ae078e.png",
    // countryCode: "DE",
    // balconyArea: "100",
    // hasLift: "true",
  },
  //virtualTourLink: "good.com",
  images: [],
  attachments: [],
  // userDefinedFields: [
  //   {
  //     label: "Extra garage",
  //     value: "Yes",
  //   },
  // ],
};

const mockData = {
  description: "My description",
  dealType: "rent",
  countryCode: "DE",
  askingSalePrice: 223,
  property: {
    location: {
      address: {
        postCode: "8037",
        city: "Zurich",
        street: "Nordstrasse",
        houseNumber: "391",
      },
      coordinates: {
        latitude: "47.3968601",
        longitude: "8.5153549",
      },
    },
    propertyType: {
      code: "multi_family_house",
    },
    numberOfUnits: 12,
    buildingYear: "1990",
    livingArea: "100.00",
    numberOfRooms: "3",
    numberOfBathrooms: "1",
    numberOfIndoorParkingSpaces: "0",
    numberOfOutdoorParkingSpaces: "0",
    hasPool: "true",
    condition: {
      bathrooms: "renovation_needed",
      kitchen: "renovation_needed",
      flooring: "well_maintained",
      windows: "new_or_recently_renovated",
    },
    quality: {
      bathrooms: "simple",
      kitchen: "normal",
      flooring: "high_quality",
      windows: "luxury",
    },
    userDefinedFields: [
      {
        label: "Extra garage",
        value: "Yes",
      },
    ],
    logo: "cf4595d3-b56f-4b38-8f54-c29ae9ae078e.png",
    countryCode: "DE",
    balconyArea: "100",
    hasLift: "true",
  },
  virtualTourLink: "good.com",
  images: [
    {
      filename: "049b8e4a-1424-4fd3-ad3e-05e84669645a.jpg",
      caption: "Image 1",
    },
  ],
  attachments: [],
  userDefinedFields: [
    {
      label: "Extra garage",
      value: "Yes",
    },
  ],
};
