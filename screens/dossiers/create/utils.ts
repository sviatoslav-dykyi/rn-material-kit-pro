import { FormikValues } from "formik";
import { createDossier } from "../../../api";
import { DossierTypes } from "../../../utils/constants";
import { Dossier } from "../types";

export const handleCreateDossierSubmit = () => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    console.log("dossier", dossier);
    const response = await createDossier(dossier);
    const json = await response.json();

    console.log("json", json);
    // signIn(values)
    //   .then((res) => {
    //     if ([200, 201].includes(res.status)) {
    //       setValues(initSignInValues);
    //       setTouched({});

    //       navigation.navigate("Home");
    //     } else {
    //       setSubmitting(false);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((err) => console.error("Rejected", err));
  };
};

export const initCreateDossier: Dossier = {
  property: {
    buildingYear: 1850,
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
  },
  images: [],
  userDefinedFields: [],
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
