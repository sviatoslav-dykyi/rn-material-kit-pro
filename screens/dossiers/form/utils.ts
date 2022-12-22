import {
  AddressComponent,
  PlaceType,
} from "react-native-google-places-autocomplete";
import { DossierTypes } from "../../../utils/constants";
import { Dossier } from "../types";
import { conditionRates, qualityRates } from "../utils";

export const findAddressDetail = (
  arr: AddressComponent[],
  field: PlaceType
): string | undefined =>
  arr.find(({ types }) => types.includes(field))?.long_name;

export const mockDossier: Dossier = {
  title: "Test8",
  dealType: "sale",
  property: {
    balconyArea: 1,
    buildingYear: 1850,
    condition: { windows: "renovation_needed" },
    energyLabel: "a_plus",
    floorNumber: 1,
    gardenArea: 1,
    isNew: true,
    livingArea: 10,
    location: {
      address: {
        city: "Freising",
        houseNumber: "20",
        postCode: "85354",
        street: "Alois-Steinecker-Straße",
      },
      coordinates: { latitude: 48.4036847, longitude: 11.7437114 },
    },
    numberOfBathrooms: 3,
    numberOfFloorsInBuilding: 1,
    numberOfIndoorParkingSpaces: 2,
    numberOfOutdoorParkingSpaces: 3,
    numberOfRooms: 1.5,
    propertyType: {
      code: DossierTypes.APARTMENT,
      subcode: "apartment_penthouse",
    },
    quality: {
      kitchen: "high_quality",
    },
    renovationYear: 1950,
  },
  images: [
    {
      filename: "8e368ac7-e984-45f6-8e73-f0fd04107e55.png",
      url: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/8e368ac7-e984-45f6-8e73-f0fd04107e55.png",
    },
    {
      filename: "5dc6cd0b-86f7-4675-955f-d97af5325017.png",
      url: "https://storage.googleapis.com/pricehubble-production-engine-public/dossiers/images/5dc6cd0b-86f7-4675-955f-d97af5325017.png",
    },
  ],
  //userDefinedFields: { label: "Extra garage", value: "Yes" },
};

export const getQualityRatingIndex = (value?: string): number =>
  qualityRates.findIndex((el) => el.value === value) + 1;

export const getConditionRatingIndex = (value?: string): number =>
  conditionRates.findIndex((el) => el.value === value) + 1;
