import {
  AddressComponent,
  GooglePlaceData,
  GooglePlaceDetail,
  PlaceType,
} from "react-native-google-places-autocomplete";
import * as DocumentPicker from "expo-document-picker";
import { DossierTypes } from "../../../utils/constants";
import { Dossier } from "../types";
import { conditionRates, qualityRates } from "../utils";
import omit from "lodash/omit";
import * as ImagePicker from "expo-image-picker";
import { upload, uploadDocument } from "../edit/utils";
import { REACT_BASE_URL } from "../../../constants/utils";
import { PickImageProps } from "./types";

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
      garage_spaces: data.property.garage_spaces?.toString() ?? "",
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
      landArea: data.property.landArea?.toString() ?? "",
      condition: {
        ...data.property.condition,
        bathrooms: data.property.condition?.bathrooms?.toString() ?? "",
        kitchen: data.property.condition?.kitchen?.toString() ?? "",
        flooring: data.property.condition?.flooring?.toString() ?? "",
        windows: data.property.condition?.windows?.toString() ?? "",
        overall: data.property.condition?.overall?.toString() ?? "",
        masonry: data.property.condition?.masonry?.toString() ?? "",
      },
      quality: {
        ...data.property.quality,
        bathrooms: data.property.quality?.bathrooms?.toString() ?? "",
        kitchen: data.property.quality?.kitchen?.toString() ?? "",
        flooring: data.property.quality?.flooring?.toString() ?? "",
        windows: data.property.quality?.windows?.toString() ?? "",
        overall: data.property.quality?.overall?.toString() ?? "",
        masonry: data.property.quality?.masonry?.toString() ?? "",
      },
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
export const GOOGLE_PACES_API_BASE_URL =
  "https://maps.googleapis.com/maps/api/place";
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

export const pickImage =
  ({
    setImageIsLoading,
    setImageErrors,
    setFieldValue,
    values,
  }: PickImageProps) =>
  async () => {
    try {
      setImageIsLoading(true);
      setImageErrors([]);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imagePromises = result.assets.map(({ uri }) =>
          upload(`${REACT_BASE_URL}/dossiers/images`, uri)
        );
        Promise.all(imagePromises)
          .then((result) => {
            const errors = result.filter((el) => el.error);
            const success = result.filter((el) => !el.error);
            setImageErrors([...errors.map(({ message }) => message)]);
            setFieldValue("images", [
              ...values.images,
              ...success.map((el) => ({ ...el, caption: el.filename })),
            ]);
            return setImageIsLoading(false);
          })
          .catch((error) => {
            console.log("error :", error);
            setImageIsLoading(false);
          });
      }
    } catch (err) {
      console.log(err);
      setImageIsLoading(false);
    }
  };

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });
    const { type } = result;
    if (type !== "success") return;
    console.log("result.uri", result.uri);
    const res = await uploadDocument(
      `${REACT_BASE_URL}/dossiers/attachments`,
      result.uri
    );
    console.log("res", res);
    //this.uploadAPICall(res); //here you can call your API and send the data to that API
  } catch (err) {
    //console.log("error--");
  }
};

export const onGoogleAutocompleteChange =
  ({
    setFieldValue,
    setTouched,
    touched,
  }: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void;
    setTouched: any;
    touched: any;
  }) =>
  (_: GooglePlaceData, details = null as GooglePlaceDetail | null) => {
    if (!details) return;
    setTouched({
      ...touched,
      property: { location: { address: { postCode: true } } },
    });
    const { geometry, address_components } = details;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;
    console.log("address_components", address_components);
    const postCode = findAddressDetail(address_components, "postal_code");
    const city = findAddressDetail(
      address_components,
      "administrative_area_level_1"
    );
    const street = findAddressDetail(address_components, "route");
    const houseNumber = findAddressDetail(address_components, "street_number");
    const location = {
      address: {
        postCode,
        city,
        street,
        houseNumber,
      },
      coordinates: {
        latitude,
        longitude,
      },
    };
    console.log("location", location);
    setFieldValue("property.location", location);
  };
