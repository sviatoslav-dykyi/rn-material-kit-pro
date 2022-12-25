import {
  AddressComponent,
  PlaceType,
} from "react-native-google-places-autocomplete";
import { DossierTypes } from "../../../utils/constants";
import { Dossier } from "../types";
import { conditionRates, qualityRates } from "../utils";
import omit from "lodash/omit";

export const findAddressDetail = (
  arr: AddressComponent[],
  field: PlaceType
): string | undefined =>
  arr.find(({ types }) => types.includes(field))?.long_name;

// export const mockDossier: Dossier = {
//   title: "Test8",
//   dealType: "sale",
//   property: {
//     balconyArea: 1,
//     buildingYear: 1850,
//     condition: { windows: "renovation_needed" },
//     energyLabel: "a_plus",
//     floorNumber: 1,
//     gardenArea: 1,
//     isNew: true,
//     livingArea: 10,
//     location: {
//       address: {
//         city: "Freising",
//         houseNumber: "20",
//         postCode: "85354",
//         street: "Alois-Steinecker-Straße",
//       },
//       coordinates: { latitude: 48.4036847, longitude: 11.7437114 },
//     },
//     numberOfBathrooms: 3,
//     numberOfFloorsInBuilding: 1,
//     numberOfIndoorParkingSpaces: 2,
//     numberOfOutdoorParkingSpaces: 3,
//     numberOfRooms: 1.5,
//     propertyType: {
//       code: DossierTypes.APARTMENT,
//       subcode: "apartment_penthouse",
//     },
//     quality: {
//       kitchen: "high_quality",
//     },
//     renovationYear: 1950,
//   },
//   images: [
//     {
//       filename: "8e368ac7-e984-45f6-8e73-f0fd04107e55.png",
//       url: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/8e368ac7-e984-45f6-8e73-f0fd04107e55.png",
//     },
//     {
//       filename: "5dc6cd0b-86f7-4675-955f-d97af5325017.png",
//       url: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5dc6cd0b-86f7-4675-955f-d97af5325017.png",
//     },
//   ],
//   //userDefinedFields: { label: "Extra garage", value: "Yes" },
// };

export const getQualityRatingIndex = (value?: string): number =>
  qualityRates.findIndex((el) => el.value === value) + 1;

export const getConditionRatingIndex = (value?: string): number =>
  conditionRates.findIndex((el) => el.value === value) + 1;

export const prepareDossierBeforeForm = (data: Dossier): Dossier => {
  return {
    ...data,
    title: data.title ?? "",
    dealType: data.dealType ?? "",
    property: {
      ...data.property,
      balconyArea: data.property.balconyArea?.toString() ?? "",
      buildingYear: data.property.buildingYear.toString() ?? "",
      floorNumber: data.property.floorNumber?.toString() ?? "",
      gardenArea: data.property.gardenArea?.toString() ?? "",
      livingArea: data.property.livingArea?.toString() ?? "",
      numberOfBathrooms: data.property.numberOfBathrooms?.toString() ?? "",
      numberOfFloorsInBuilding:
        data.property.numberOfFloorsInBuilding?.toString() ?? "",
      numberOfIndoorParkingSpaces:
        data.property.numberOfIndoorParkingSpaces?.toString() ?? "",
      numberOfOutdoorParkingSpaces:
        data.property.numberOfOutdoorParkingSpaces?.toString() ?? "",
      numberOfRooms: data.property.numberOfRooms?.toString() ?? "",
      renovationYear: data.property.renovationYear?.toString() ?? "",
    },
  };
};

// export const prepareDossierBeforeSubmit = (data: Dossier): Dossier => {
//   const obj = {};
//   const arr: any[] = [];
//   const arr1: any[] = [];
//   Object.keys(data).forEach((key) => {
//     if (data[key as keyof Dossier] === "") {
//       arr.push(key);
//     }
//   });
//   Object.entries(data.property as any).forEach((ar) => {
//     if (ar[1] === "") {
//       arr1.push(ar[0]);
//     }
//   });
//   const propertyFiltered = omit(data.property, [...arr1]);
//   const y = console.log("arr1", arr1);
//   console.log("rr", rr);
// };

export const removeEmptyString = (object: any) => {
  Object.entries(object).forEach(([key, value]: any[]) => {
    if (value && typeof value === "object") removeEmptyString(value);
    if (
      (value && typeof value === "object" && !Object.keys(value).length) ||
      value === null ||
      value === undefined ||
      value.length === 0
    ) {
      if (Array.isArray(object)) object.splice(key, 1);
      else delete object[key];
    }
  });
  return object;
};

export const GOOGLE_API_KEY = "AIzaSyC1jikr2uE40MmY83vnuDzFCYFhZWYAolg";

// "property": Object {
//   "balconyArea": "",
//   "buildingYear": "1990",
//   "condition": Object {
//     "flooring": "renovation_needed",
//   },
//   "floorNumber": "",
//   "gardenArea": "",
//   "hasPool": true,
//   "landArea": 900,
//   "livingArea": "100",
//   "location": Object {
//     "address": Object {
//       "city": "Zurich",
//       "houseNumber": "391",
//       "postCode": "8037",
//       "street": "Nordstrasse",
//     },
//     "coordinates": Object {
//       "latitude": 47.3968601,
//       "longitude": 8.5153549,
//     },
//   },
//   "numberOfBathrooms": "1",
//   "numberOfFloorsInBuilding": "",
//   "numberOfIndoorParkingSpaces": "0",
//   "numberOfOutdoorParkingSpaces": "0",
//   "numberOfRooms": "3",
//   "propertyType": Object {
//     "code": "house",
//     "subcode": "house_detached",
//   },
//   "quality": Object {
//     "bathrooms": "simple",
//     "flooring": "high_quality",
//     "kitchen": "normal",
//     "windows": "luxury",
//   },
//   "renovationYear": "",
//   "volume": 900,
// },
// "title": "My Lambda Dossier",
// "updatedAt": "2022-12-22T12:03:26.617Z",
// "user": "639a4308b1c8c1f124c4b4ce",
// "userDefinedFields": Array [
//   Object {
//     "_id": "63a4478ee0f99b623ff8cb4a",
//     "label": "Extra garage",
//     "value": "Yes",
//   },
// ],
// }
