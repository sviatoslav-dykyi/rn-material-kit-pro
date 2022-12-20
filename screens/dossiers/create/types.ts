import { DossierTypeIds } from "../../../utils/constants";

export interface Dossier {
  title: string;
  address: string;
  type: DossierType;
  //Appartment
  appartmentSubtype: AppartmentSubtype;
  appartmentDealType: DealType;
  appartmentBuildYear: number;
  appartmentRenovationYear: number;
  appartmentNetLivingAreaInM2: number;
  appartmentEnergyLabel: EnergyLabel;
  appartmentFloorNumber: number;
  appartmentNumberOfFloors: number;
  appartmentNumberOfRooms: number;
  appartmentNumberOfBathrooms: number;
  appartmentBalconyOrTerraceInM2: number;
  appartmentGardenInM2: number;
  appartmentGarageSpaces: number;
  appartmentOutdoorParkingSpaces: number;
  appartmentNewBuilding: true;
  appartmentLift: true;
  appartmentKitchenQualityRate: QualityRate;
  appartmentKitchenConditionRate: ConditionRate;
  appartmentBathroomsQualityRate: QualityRate;
  appartmentBathroomsConditionRate: ConditionRate;
  appartmentFloorQualityRate: QualityRate;
  appartmentFloorConditionRate: ConditionRate;
  appartmentWindowsQualityRate: QualityRate;
  appartmentWindowsConditionRate: ConditionRate;
  //House
  houseSubtype: HouseSubtype;
  houseDealType: DealType;
  houseBuildYear: number;
  houseRenovationYear: number;
  houseNetLivingAreaInM2: number;
  houseLandAreaInM2: number;
  houseEnergyLabel: EnergyLabel;
  houseNumberOfFloors: number;
  houseNumberOfRooms: number;
  houseNumberOfBathrooms: number;
  houseBalconyOrTerraceInM2: number;
  houseGarageSpaces: number;
  houseOutdoorParkingSpaces: number;
  houseNewBuilding: true;
  housePool: true;
  houseSauna: true;
  houseKitchenQualityRate: QualityRate;
  houseKitchenConditionRate: ConditionRate;
  houseBathroomsQualityRate: QualityRate;
  houseBathroomsConditionRate: ConditionRate;
  houseFloorQualityRate: QualityRate;
  houseFloorConditionRate: ConditionRate;
  houseWindowsQualityRate: QualityRate;
  houseWindowsConditionRate: ConditionRate;
  houseMasonryQualityRate: QualityRate;
  houseMasonryConditionRate: ConditionRate;
  //MultiFamilyHouse
  multiFamilyHouseBuildYear: number;
  multiFamilyHouseNumberOfResidentialUnits: number;
  multiFamilyHouseNetLivingAreaInM2: number;
  multiFamilyHouseLandAreaInM2: number;
  multiFamilyHouseAnnualNetRentIncomeInEur: number;
  multiFamilyHouseBuildingQualityRate: QualityRate;
  multiFamilyHouseBuildingConditionRate: ConditionRate;
  //Common
  description: string;
  photos: string[];
  attachment: File;
  //Ids
  typeId: number;
  appartmentSubtypeId: number;
  appartmentDealTypeId: number;
  appartmentEnergyLabelId: number;
  appartmentKitchenQualityRateId: number;
  appartmentKitchenConditionRateId: number;
  appartmentBathroomsQualityRateId: number;
  appartmentBathroomsConditionRateId: number;
  appartmentFloorQualityRateId: number;
  appartmentFloorConditionRateId: number;
  appartmentWindowsQualityRateId: number;
  appartmentWindowsConditionRateId: number;
  houseSubtypeId: number;
  houseDealTypeId: number;
  houseEnergyLabelId: number;
  houseKitchenQualityRateId: number;
  houseKitchenConditionRateId: number;
  houseBathroomsQualityRateId: number;
  houseBathroomsConditionRateId: number;
  houseFloorQualityRateId: number;
  houseFloorConditionRateId: number;
  houseWindowsQualityRateId: number;
  houseWindowsConditionRateId: number;
  houseMasonryQualityRateId: number;
  houseMasonryConditionRateId: number;
  multiFamilyHouseBuildingQualityRateId: number;
  multiFamilyHouseBuildingConditionRateId: number;
}

export interface DossierType {
  id: DossierTypeIds;
  name: DossierTypeName;
  icon?: string;
}

export type DossierTypeName = "Apartment" | "House" | "Multi-family house";

export interface AppartmentSubtype {
  id: number;
  name:
    | "Apartment"
    | "Penthouse"
    | "Maisonette"
    | "Attic apartment"
    | "Terraced apartment"
    | "Studio";
}

export interface HouseSubtype {
  id: number;
  name:
    | "Detached house"
    | "Semi-detached house"
    | "Terraced house - end"
    | "Terraced house - middle"
    | "Farm";
}

export interface DealType {
  id: number;
  name: "Sale" | "Rent" | "Sale&Rent";
}

export interface EnergyLabel {
  id: number;
  name: "A+++" | "A++" | "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
}

export interface QualityRate {
  id: number;
  name: "Simple" | "Normal" | "High-quality" | "Luxury";
  description: string;
}

export interface ConditionRate {
  id: number;
  name: "Needs renovation" | "Well Maintained" | "New/Recently renovated";
}
