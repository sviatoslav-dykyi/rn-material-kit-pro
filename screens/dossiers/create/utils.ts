import { Dimensions, StyleSheet, Platform } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../../constants/utils";
import { materialTheme } from "../../../constants";
import {
  AppartmentSubtype,
  ConditionRate,
  DealType,
  DossierType,
  EnergyLabel,
  HouseSubtype,
  QualityRate,
} from "./types";
import { DossierTypeIds } from "../../../utils/constants";

export const initCreateDossierValues = {
  title: "",
  address: "",
  typeId: DossierTypeIds.APPARTMENT,
  appartmentSubtypeId: "",
  appartmentDealTypeId: "",
  appartmentBuildYear: "",
  appartmentRenovationYear: "",
  appartmentNetLivingAreaInM2: "",
  appartmentEnergyLabel: "",
  appartmentFloorNumber: "",
  appartmentNumberOfFloors: "",
  appartmentNumberOfRooms: "",
  appartmentNumberOfBathrooms: "",
  appartmentBalconyOrTerraceInM2: "",
  appartmentGardenInM2: "",
  appartmentGarageSpaces: "",
  appartmentOutdoorParkingSpaces: "",
  appartmentNewBuilding: false,
  appartmentLift: false,
  appartmentKitchenQualityRate: "",
  appartmentKitchenConditionRate: "",
  appartmentBathroomsQualityRate: "",
  appartmentBathroomsConditionRate: "",
  appartmentFloorQualityRate: "",
  appartmentFloorConditionRate: "",
  appartmentWindowsQualityRate: "",
  appartmentWindowsConditionRate: "",
  description: "",

  //house

  houseLandAreaInM2: "",
  //
  phone: "+493482932441",
  email: "zainіііi@gmail.com",
  password: "pass1234",
  passwordConfirm: "pass1234",
  firstName: "muhammadu",
  lastName: "zaini",
};

export const dossierTypes: DossierType[] = [
  { id: DossierTypeIds.APPARTMENT, name: "Apartment", icon: "apartment" },
  { id: DossierTypeIds.HOUSE, name: "House", icon: "house" },
  {
    id: DossierTypeIds.MULTI_FAMILY_HOUSE,
    name: "Multi-family house",
    icon: "corporate-fare",
  },
];

export const dossierTypeIdInit = DossierTypeIds.APPARTMENT;
export const defaultRating = 0;
export const RATING_REVIEW_SIZE = 12;
export const RATING_SIZE = 18;
export const MIN_HEIGHT_RICH_CONTAINER = 150;

export const appartmentSubtypes: AppartmentSubtype[] = [
  { id: 1, name: "Apartment" },
  { id: 2, name: "Penthouse" },
  { id: 3, name: "Maisonette" },
  { id: 4, name: "Attic apartment" },
  { id: 5, name: "Terraced apartment" },
  { id: 6, name: "Studio" },
];

export const houseSubtypes: HouseSubtype[] = [
  { id: 1, name: "Detached house" },
  { id: 2, name: "Semi-detached house" },
  { id: 3, name: "Terraced house - end" },
  { id: 4, name: "Farm" },
];

export const appartmentDealTypes: DealType[] = [
  {
    id: 1,
    name: "Sale",
  },
  {
    id: 2,
    name: "Rent",
  },
  {
    id: 3,
    name: "Sale&Rent",
  },
];

export const energyLabels: EnergyLabel[] = [
  {
    id: 1,
    name: "A+++",
  },
  {
    id: 2,
    name: "A++",
  },
  {
    id: 3,
    name: "A+",
  },
  {
    id: 4,
    name: "A",
  },
  {
    id: 5,
    name: "B",
  },
  {
    id: 6,
    name: "C",
  },
  {
    id: 7,
    name: "D",
  },
  {
    id: 8,
    name: "E",
  },
  {
    id: 8,
    name: "F",
  },
  {
    id: 8,
    name: "G",
  },
  {
    id: 8,
    name: "H",
  },
];

export const qualityRates: QualityRate[] = [
  {
    id: 1,
    name: "Simple",
    description: "lower price segment, small, basic appliances",
  },
  {
    id: 2,
    name: "Normal",
    description: "medium price segment, standard appliances",
  },
  {
    id: 3,
    name: "High-quality",
    description: "branded appliances, high standard, spacious",
  },
  {
    id: 4,
    name: "Luxury",
    description: "exclusive appliances, luxury materials, very spacious",
  },
];

export const conditionRates: ConditionRate[] = [
  {
    id: 1,
    name: "Needs renovation",
  },
  {
    id: 2,
    name: "Well Maintained",
  },
  {
    id: 3,
    name: "New/Recently renovated",
  },
];
