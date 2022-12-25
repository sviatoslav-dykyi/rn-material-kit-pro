import * as Yup from "yup";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export const crimsonColor = "rgba(222, 5, 0, 0.37)";
export const DATE_FORMAT = "DD/MM/YYYY";
export const PASSWORD_MIN_CHARACTERS = 8;
export const PASSWORD_MAX_CHARACTERS = 255;
export const FIRST_NAME_MAX_CHARACTERS = 20;
export const FIRST_NAME_MIN_CHARACTERS = 2;
export const LAST_NAME_MAX_CHARACTERS = 20;
export const LAST_NAME_MIN_CHARACTERS = 2;
export const MOBILE_MAX_CHARACTERS = 15;
export const PHONE_MAX_CHARACTERS = 13;
export const SEARCH_PARAM_MIN_CHARACTERS = 2;
export const GENERAL_SEARCH_PARAM_MIN_CHARACTERS = 4;
export const NOTES_MAX_CHARACTERS = 255;
export const OBJECT_NAME_MIN_CHARACTERS = 2;
export const OBJECT_NAME_MAX_CHARACTERS = 255;
export const PURCHASE_PRICE_MIN_CHARACTERS = 1;
export const PURCHASE_PRICE_MAX_CHARACTERS = 255;
export const FILE_NAME_MIN_CHARACTERS = 2;
export const TENANT_USERS_FILTER = "&property_area_user_id[]=";

export const FormMessageInItState = {
  type: undefined,
  text: "",
};

export const COMPANY_NAME = "immowin24";

export const ADMINISTRATIVE_EXPENSES = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6,
];

//TODO: remove and don't use, ROLE_IDS instead
export const ROLE_ID_ASSET_MANAGERS = "3";
export const ROLE_ID_CARETAKERS = "5";
export const COMPANY_TYPE_ID_PROPERTY_MANAGEMENT = "2";
export const ROLE_ID_ADMIN = "1";

export const SOMETHING_WENT_WRONG_ERROR = "errorSomethingWentWrong";
export const FORMTYPE_SURFACE = "Surface";
export const FormMessageErrorState = {
  type: "error",
  text: SOMETHING_WENT_WRONG_ERROR,
};
export const ONLY_ONE_FUTURE_TENANT = "onlyOneFutureTenant";

export const COMPANY_GENERAL_TYPE_ID = "1";
export const COMPANY_PROPERTY_MANAGEMENT_TYPE_ID = "2";

export const NO_DATA_IS_AVAILABLE = "table.noDataIsAvailable";

export const STATUS_TEXT_500 = "Internal Server Error";

export const ZIP_CODE_LENGTH = 5;
export const YEAR_LENGTH = 4;
export const CURRENT_YEAR = new Date().getFullYear();
export const MINIMUM_YEAR = 1700;

export const IBAN_CHARACTERS_NUMBER = 22;
export const INVOICE_MONTHLY_NUMBER = 28;

export const TENANT_TYPE_ID_PARAM = "tenant_type_id[]";
export const AREA_TYPE_ID_PARAM = "type_id";
export const BANK_ACCOUNT_ID_PARAM = "bank_account_id";
export const LOG_TYPE_ID_PARAM = "type_id";
export const DATE_FROM_PARAM = "date_from";
export const DATE_TO_PARAM = "date_to";
export const USERS_ACTIVITY_ID_PARAM = "users[]";
export const TENANT_ID_PARAM = "tenant_id[]";
export const IS_FUTURE_PARAM = "is_future";
export const PROPERTY_ID_PARAM = "property_id";
export const LIST_INVOICES_PARAM = "list_invoices[]";

const currentYear = new Date().getFullYear();

export const MIN_BUILDING_YEAR = 1850;
export const MIN_RENOVATION_YEAR = 1950;
export const MIN_LIVING_AREA = 100;
export const MAX_LIVING_AREA = 800;
export const MIN_FLOOR_NUMBER = 1;
export const MAX_FLOOR_NUMBER = 30;
export const MIN_ROOMS = 1;
export const MAX_ROOMS = 20;
export const MIN_BATHROOMS = 1;
export const MAX_BATHROOMS = 5;
export const MIN_BALCONY_AREA = 1;
export const MAX_BALCONY_AREA = 200;
export const MIN_GARDEN_AREA = 1;
export const MAX_GARDEN_AREA = 200;
export const MIN_OUTDOOR_PARKING_SPACES = 1;
export const MAX_OUTDOOR_PARKING_SPACES = 6;
export const MIN_LAND_AREA = 50;
export const MAX_LAND_AREA = 5000;
export const MIN_ANNUAL_NET_RENT_INCOME = 5000;
export const MAX_ANNUAL_NET_RENT_INCOME = 1000000;

const useValidation = () => {
  const passwordMinCharactersErrorMessage = `Password must Be at least ${PASSWORD_MIN_CHARACTERS} characters`;

  return {
    firstName: Yup.string()
      .max(
        FIRST_NAME_MAX_CHARACTERS,
        `Max length should be no more then ${FIRST_NAME_MAX_CHARACTERS} characters`
      )
      .min(
        FIRST_NAME_MIN_CHARACTERS,
        `Min length should be no less then ${FIRST_NAME_MIN_CHARACTERS} characters`
      )
      .required("First name is required"),
    lastName: Yup.string()
      .max(
        LAST_NAME_MAX_CHARACTERS,
        `Min length should be no less then ${LAST_NAME_MAX_CHARACTERS} characters`
      )
      .min(
        LAST_NAME_MIN_CHARACTERS,
        `Max length should be no more then ${LAST_NAME_MIN_CHARACTERS} characters`
      )
      .required("Last name is required"),
    email: Yup.string()
      //temporary solution because imported client emails have spaces
      .transform((v) => v.replace(/ /g, ""))
      .required("Email is required")
      .email("Email is not valid"),
    phone: Yup.string()
      .min(
        PHONE_MAX_CHARACTERS,
        `Phone number should be more than ${PHONE_MAX_CHARACTERS} characters`
      )
      .required("Phone number is required")
      .test("starts with +49", "Phone number must start with +49", (value) => {
        return /^\+49/.test(String(value));
      })
      .matches(/^\+[0-9]+$/, "Must be only numbers"),
    password: Yup.string()
      .max(PASSWORD_MAX_CHARACTERS)
      .min(PASSWORD_MIN_CHARACTERS, passwordMinCharactersErrorMessage)
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .max(PASSWORD_MAX_CHARACTERS)
      .min(PASSWORD_MIN_CHARACTERS, passwordMinCharactersErrorMessage)
      .when("password", {
        is: (value: string) => !!value,
        then: Yup.string().required("Password confirmation is required"),
      })
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    property: Yup.object({
      buildingYear: Yup.number()
        .min(MIN_BUILDING_YEAR, `${MIN_BUILDING_YEAR} - current year`)
        .max(currentYear, `${MIN_BUILDING_YEAR} - current year`)
        .required("Building year is required"),
      renovationYear: Yup.number()
        .min(MIN_RENOVATION_YEAR, `${MIN_RENOVATION_YEAR} - current year`)
        .max(currentYear, `${MIN_RENOVATION_YEAR} - current year`),
      livingArea: Yup.number()
        .min(
          MIN_LIVING_AREA,
          `Living area should be not less than ${MIN_LIVING_AREA}`
        )
        .max(
          MAX_LIVING_AREA,
          `Living area should be not more than ${MAX_LIVING_AREA}`
        )
        .required("Living area is required"),
      floorNumber: Yup.number()
        .min(
          MIN_FLOOR_NUMBER,
          `Floor number should not be less than ${MIN_FLOOR_NUMBER}`
        )
        .max(
          MAX_FLOOR_NUMBER,
          `Floor number should not be more than ${MAX_FLOOR_NUMBER}`
        ),
      numberOfFloorsInBuilding: Yup.number()
        .min(
          MIN_FLOOR_NUMBER,
          `Number of floors should not be less than ${MIN_FLOOR_NUMBER}`
        )
        .max(
          MAX_FLOOR_NUMBER,
          `Number of floors should not be more than ${MAX_FLOOR_NUMBER}`
        ),
      numberOfRooms: Yup.number()
        .min(MIN_ROOMS, `Number of rooms should not be less than ${MIN_ROOMS}`)
        .max(MAX_ROOMS, `Number of rooms should not be more than ${MAX_ROOMS}`),
      numberOfBathrooms: Yup.number()
        .min(
          MIN_BATHROOMS,
          `Number of bathrooms should not be less than ${MIN_BATHROOMS}`
        )
        .max(
          MAX_BATHROOMS,
          `Number of bathrooms should not be more than ${MAX_BATHROOMS}`
        ),
      balconyArea: Yup.number()
        .min(
          MIN_BALCONY_AREA,
          `Balcony area should not be less than ${MIN_BALCONY_AREA}`
        )
        .max(
          MAX_BALCONY_AREA,
          `Balcony area should not be more than ${MAX_BALCONY_AREA}`
        ),
      gardenArea: Yup.number()
        .min(
          MIN_GARDEN_AREA,
          `Garden area should not be less than ${MIN_GARDEN_AREA}`
        )
        .max(
          MAX_GARDEN_AREA,
          `Garden area should not be more than ${MAX_GARDEN_AREA}`
        ),
      numberOfOutdoorParkingSpaces: Yup.number()
        .min(
          MIN_OUTDOOR_PARKING_SPACES,
          `Number of outdoor parking spaces should not be less than ${MIN_OUTDOOR_PARKING_SPACES}`
        )
        .max(
          MAX_OUTDOOR_PARKING_SPACES,
          `Number of outdoor parking spaces should not be more than ${MAX_OUTDOOR_PARKING_SPACES}`
        ),
      landArea: Yup.number()
        .min(
          MIN_LAND_AREA,
          `Land area should not be less than ${MIN_LAND_AREA}`
        )
        .max(
          MAX_LAND_AREA,
          `Land area should not be more than ${MAX_LAND_AREA}`
        ),
      annualRentIncome: Yup.number()
        .min(
          MIN_ANNUAL_NET_RENT_INCOME,
          `Annual net rent income should not be less than ${MIN_ANNUAL_NET_RENT_INCOME} EUR`
        )
        .max(
          MAX_ANNUAL_NET_RENT_INCOME,
          `Annual net rent income should not be more than ${MAX_ANNUAL_NET_RENT_INCOME} EUR`
        ),
    }),
  };
};

export default useValidation;
