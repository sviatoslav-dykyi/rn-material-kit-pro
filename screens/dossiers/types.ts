import { number } from "yup/lib/locale";
import { DossierTypeIds, DossierTypes } from "../../utils/constants";

export interface Dossier {
  _id?: string;
  title?: string;
  dealType?: DealType; //*
  property: {
    propertyType: {
      code: DossierTypes; //*
      subcode?: AppartmentSubtype | HouseSubtype;
    };
    location: {
      address: {
        postCode: string; // *
        city: string; // *
        street: string; // *
        houseNumber: string; // *
      };
      coordinates: { latitude: number; longitude: number };
    };
    buildingYear: number | string; //* 1850 - current year
    renovationYear?: number | string; // 1950 - current year
    livingArea?: number | string; // 10 - 800
    landArea?: number | string; //* - only for multi and house 50 - 5000
    volume?: number | string;
    balconyArea?: number | string; // 1-200
    hasLift?: boolean | string;
    isNew?: boolean;
    hasSauna?: boolean;
    hasPool?: boolean;
    floorNumber?: number | string; // 1-30
    number_of_residential_units?: number | string; // * - only for multi
    annualRentIncome?: number | string; // 5’000 - 1’000’000
    numberOfFloorsInBuilding?: number | string; // 1-30
    numberOfRooms?: number | string; // 1-20, step 0.5: 1, 1.5, 2, 2.5
    numberOfBathrooms?: number | string; // 1-5
    numberOfIndoorParkingSpaces?: number | string;
    numberOfOutdoorParkingSpaces?: number | string; // 1-6
    condition?: {
      bathrooms?: string;
      kitchen?: string;
      flooring?: string;
      windows?: string;
      overall?: string;
    };
    quality?: {
      bathrooms?: string;
      kitchen?: string;
      flooring?: string;
      windows?: string;
      overall?: string;
    };
    gardenArea?: number | string; // 1-200
    energyLabel?: EnergyLabel;
    garage_spaces?: number | string; // 1-6
  };
  countryCode?: "DE";
  images: { filename: string; url: string }[];
  //userDefinedFields?: { label: string; value: string };
}

export interface DossierType {
  id: DossierTypeIds;
  name: DossierTypeName;
  icon?: string;
}

export type DossierTypeName = "Apartment" | "House" | "Multi-family house";

export type AppartmentSubtype =
  | "apartment_normal"
  | "apartment_penthouse"
  | "apartment_maisonette"
  | "apartment_attic"
  | "apartment_terraced"
  | "apartment_studio";

export type DealType = "sale" | "rent" | "";

export type HouseSubtype =
  | "detached_house"
  | "semi_detached_house"
  | "terraced_house_end"
  | "terraced_house_middle"
  | "farm";

export type EnergyLabel =
  | "a_plus_plus"
  | "a_plus"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h";

export type QualityRate = "simple" | "normal" | "high_quality" | "luxury";

// export interface QualityRate {
//   id: number;
//   name: "Simple" | "Normal" | "High-quality" | "Luxury";
//   description: string;
// }

export type ConditionRate =
  | "renovation_needed"
  | "well_maintained"
  | "new_or_recently_renovated";

// export interface ConditionRate {
//   id: number;
//   name: "Needs renovation" | "Well Maintained" | "New/Recently renovated";
// }
