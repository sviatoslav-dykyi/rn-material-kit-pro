import * as Yup from "yup";
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

const useValidation = () => {
  const passwordMinCharactersErrorMessage = `Password must Be at least ${PASSWORD_MIN_CHARACTERS} characters`;

  // const compareFormattedFields =
  //   (valueFrom: string) =>
  //   (
  //     valueTo: string | undefined,
  //     testContext: Yup.TestContext<AnyObject>
  //   ): boolean => {
  //     return valueTo
  //       ? parseNumber(valueTo) >= parseNumber(testContext.parent[valueFrom])
  //       : true;
  //   };

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
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    // purchase_price: Yup.string()
    //   .max(PURCHASE_PRICE_MAX_CHARACTERS, t("form.purchasePriceMaxCharacters"))
    //   .min(PURCHASE_PRICE_MIN_CHARACTERS, t("form.purchasePriceMinCharacters"))
    //   .required(t("form.purchasePriceIsRequired")),
    // company_name: Yup.string().required(t("form.companyNameIsRequired")),
    // company_id: {
    //   required: Yup.string().required(t("form.companyNameIsRequired")),
    //   optional: Yup.string().optional().nullable(),
    // },
    // notes: Yup.string().max(NOTES_MAX_CHARACTERS, t("form.notesMaxCharacters")),
    // object_name: Yup.string()
    //   .max(OBJECT_NAME_MAX_CHARACTERS, t("form.objectNameMaxCharacters"))
    //   .min(OBJECT_NAME_MIN_CHARACTERS, t("form.objectNameMinCharacters"))
    //   .required(t("form.objectNameIsRequired")),
    // place_id: Yup.string().required(t("form.placeIdIsRequired")),
    // country_code: Yup.string().required(t("form.countryIsRequired")),
    // state_code: Yup.string().required(t("form.stateIsRequired")),
    // company_type_id: Yup.string()
    //   .required(t("form.companyTypeIsRequired"))
    //   .nullable(),
    // city: Yup.string().required(t("form.cityIsRequired")).nullable(),
    // zip_code: Yup.string()
    //   .required(t("form.zipCodeIsRequired"))
    //   .min(ZIP_CODE_LENGTH, t("form.zipcodeLengthError"))
    //   .max(ZIP_CODE_LENGTH, t("form.zipcodeLengthError")),
    // street: Yup.string().required(t("form.streetIsRequired")),
    // house_number: Yup.string().required(t("form.houseNumberIsRequired")),
    // country: Yup.string().required(t("form.countryIsRequired")),
    // circle: Yup.string().required(t("form.circleIsRequired")),
    // state: Yup.string().required(t("form.stateIsRequired")).nullable(),
    // finance_volume: Yup.string().required(t("form.financeVolumeIsRequired")),

    // finance_volume_from_value: Yup.string().required(
    //   t("form.financeVolumeFromValueIsRequired")
    // ),
    // finance_volume_to_value: Yup.string().required(
    //   t("form.financeVolumeToValueIsRequired")
    // ),

    // ltv: Yup.string().required(t("form.ltvIsRequired")),
    // avg_interest_rate: Yup.number()
    //   .typeError(t("form.typeNumberOnly"))
    //   .required(t("form.avgInterestRateIsRequired")),
    // avg_amortisation: Yup.string().required(t("form.avgAmortisation")),
    // avg_repayment: Yup.string().required(t("form.avgRepaymentIsRequired")),
    // state_id: Yup.string().required(t("form.stateIsRequired")),
    // property_type_id: Yup.string().required(t("form.propertyTypeIsRequired")),
    // contactIsRequired: Yup.string().required(t("form.contactIsRequired")),
    // companyCreate: {
    //   title: Yup.string().required(t("form.titleIsRequired")),
    //   city: Yup.string().required(t("form.cityIsRequired")),
    // },
    // supervisor_id: Yup.number(),
    // expenses: Yup.string(),
    // tax_number: Yup.number().required(t("form.taxNumberIsRequired")),
    // vat: Yup.string().required(t("form.vatIsRequired")),
    // architect: Yup.string().required(t("form.architectIsRequired")),
    // searchProfileTitle: Yup.string().required(t("form.titleIsRequired")),
    // searchProfileZipCode: Yup.string()
    //   .min(ZIP_CODE_LENGTH, t("searchProfile.searchProfileZipCode"))
    //   .max(ZIP_CODE_LENGTH, t("searchProfile.searchProfileZipCode")),
    // construction_year: Yup.number()
    //   .min(MINIMUM_YEAR, t("setMinYear"))
    //   .max(CURRENT_YEAR, t("disableFuture")),
    // renovation: Yup.number()
    //   .min(MINIMUM_YEAR, t("setMinYear"))
    //   .max(CURRENT_YEAR, t("disableFuture")),
    // sale_area_to: Yup.string().test(
    //   "sale_area_compare",
    //   `${t("searchProfile.saleAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.saleAreaFrom"
    //   )}`,
    //   compareFormattedFields("sale_area_from")
    // ),

    // rentable_area_to: Yup.string().test(
    //   "rentable_area_compare",
    //   `${t("searchProfile.rentableAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.rentableAreaFrom"
    //   )}`,
    //   compareFormattedFields("rentable_area_from")
    // ),

    // office_area_to: Yup.string().test(
    //   "office_area_compare",
    //   `${t("searchProfile.officeAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.officeAreaFrom"
    //   )}`,
    //   compareFormattedFields("office_area_from")
    // ),

    // practice_area_to: Yup.string().test(
    //   "practice_area_compare",
    //   `${t("searchProfile.practiceAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.practiceAreaFrom"
    //   )}`,
    //   compareFormattedFields("practice_area_from")
    // ),

    // commercial_area_to: Yup.string().test(
    //   "commercial_area_compare",
    //   `${t("searchProfile.commercialAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.commercialAreaFrom"
    //   )}`,
    //   compareFormattedFields("commercial_area_from")
    // ),

    // living_area_to: Yup.string().test(
    //   "living_area_compare",
    //   `${t("searchProfile.livingAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.livingAreaFrom"
    //   )}`,
    //   compareFormattedFields("living_area_from")
    // ),

    // other_area_to: Yup.string().test(
    //   "other_area_compare",
    //   `${t("searchProfile.livingAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.livingAreaFrom"
    //   )}`,
    //   compareFormattedFields("other_area_from")
    // ),

    // inhabitants_to: Yup.string().test(
    //   "inhabitants_compare",
    //   `${t("searchProfile.inhabitantsTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.inhabitantsFrom"
    //   )}`,
    //   compareFormattedFields("inhabitants_from")
    // ),

    // plot_area_to: Yup.string().test(
    //   "plot_area_compare",
    //   `${t("searchProfile.plotAreaTo")} ${t("greaterOrEqual")} ${t(
    //     "searchProfile.plotAreaFrom"
    //   )}`,
    //   compareFormattedFields("plot_area_from")
    // ),

    // iban: Yup.string()
    //   .transform((v) => v.replace(/ /g, ""))
    //   .min(IBAN_CHARACTERS_NUMBER, t("property.bank.ibanCharactersNumber"))
    //   .max(IBAN_CHARACTERS_NUMBER, t("property.bank.ibanCharactersNumber"))
    //   .required(t("property.bank.ibanIsRequired")),
    // property_management_cost: Yup.string()
    //   .required(t("form.propertyManagementCostIsRequired"))
    //   .nullable(),
    // caretaker_id: Yup.number()
    //   .required(t("form.caretakerIsRequired"))
    //   .nullable(),
    // asset_managers: Yup.array().min(1, t("form.assetManagerIsRequired")),
    // tenant_type_id: Yup.number().required(
    //   t("tenant.propertyTenantTypeIsRequired")
    // ),
    // tenant_category_id: Yup.number().required(
    //   t("tenant.propertyTenantCategoryIsRequired")
    // ),
    // immoscout_url: Yup.string()
    //   .when("is_immoscout_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.immoscoutRequired")),
    //   })
    //   ?.nullable(),
    // immowelt_url: Yup.string()
    //   .when("is_immowelt_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.immowelRequired")),
    //   })
    //   .nullable(),
    // ebay_url: Yup.string()
    //   .when("is_ebay_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.ebayRequired")),
    //   })
    //   .nullable(),
    // agent_commissioned_url: Yup.string()
    //   .when("is_agent_commissioned_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.agentCommissionedRequired")),
    //   })
    //   .nullable(),
    // warning_text: Yup.string()
    //   .when("is_warning_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.warningTextIsRequired")),
    //   })
    //   .nullable(),
    // legal_dunning_text: Yup.string()
    //   .when("is_legal_dunning_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.legalTextIsRequired")),
    //   })
    //   .nullable(),
    // installment_text: Yup.string()
    //   .when("is_installment_enabled", {
    //     is: true,
    //     then: Yup.string().required(t("tenant.installmentTextIsRequired")),
    //   })
    //   .nullable(),
    // file_id: Yup.string().required(t("invoice.error.fileId")),
    // contact_id: Yup.string().required(t("invoice.error.contactId")),
    // amount: Yup.string()
    //   .required(t("invoice.error.amount"))
    //   .typeError(t("invoice.error.amountType")),
    // is_permanent: Yup.boolean(),
    // is_apportionable: Yup.boolean(),
    // comment: Yup.string().required(t("invoice.error.comment")),
    // date: Yup.date().required("invoice.error.date").typeError(t("invalidDate")),
    // until: Yup.date().when("is_permanent", {
    //   is: true,
    //   then: Yup.date().required(t("invalidDate")),
    // }),
    // total: Yup.string().when("is_permanent", {
    //   is: true,
    //   then: Yup.string().required(t("invoice.error.total")),
    // }),
    // cancellation_period: Yup.string().required(t("form.cancellationPeriod")),
    // release_am: Yup.string().required(t("form.releaseAm")).nullable(),
    // monthly: Yup.string().when("is_permanent", {
    //   is: true,
    //   then: Yup.string().required(t("invoice.error.monthly")),
    // }),
    // contract_id: Yup.string().required(t("invoice.error.contractId")),
    // offer_id: Yup.string().required(t("invoice.error.offerId")),
    // apportionable_percent: Yup.string().when("is_apportionable", {
    //   is: true,
    //   then: Yup.string().required(t("invoice.error.apportionablePercent")),
    // }),
    // name: Yup.string().required(t("form.nameIsRequired")),
    // contract_category_id: Yup.string().required(
    //   t("contracts.error.contractCategoryId")
    // ),
    // type: Yup.string().required(t("form.insuranceType")),
    // topic_id: Yup.string().required(t("offers.error.topic")),
    // user_id: Yup.string().required(t("invoice.error.userId")),
    // releaserComment: Yup.string().required(
    //   t("invoice.release.commentRequired")
    // ),
    // location_name: Yup.string().required(t("employeeOverview.locationName")),
    // heatingNumber: Yup.string().required(t("counter.create.heatingRequired")),
    // heatingValue: Yup.string().required(
    //   t("counter.create.heatingValueRequired")
    // ),
    // vacation_holiday_user_selection: Yup.array().min(
    //   1,
    //   t("employeeOverview.vacationHolidayUserSelectionValidation")
    // ),
    // option_id: Yup.number()
    //   .required(t("employeeOverview.locationOfficeIsRequired"))
    //   .nullable(),
    // title: Yup.string().required(t("form.titleIsRequired")),
    // description: Yup.string().required(t("form.descriptionIsRequired")),
    // type_id: Yup.string().required(t("form.type_id")),
    // number: Yup.string().required(t("form.number")).nullable(),
    // bank_name: Yup.string().required(t("form.bankNameIsRequired")),
    // area_name: Yup.string().required(t("form.areaName")),
    // area: Yup.string().required(t("form.area")),
    // net_rent_per_month: Yup.string().required(t("form.netRentPerMonth")),
    // rent_start: Yup.date().required(t("form.rentStart")),
    // rent_end: Yup.date().nullable(),
    // others_incomings_eur: checkTenantType("form.otherIncomingsEur"),
    // optional_contact_id: checkTenantType("invoice.error.contactId"),
    // property_id: Yup.string().required(t("form.propertyId")),
    // square_meters: Yup.string().required(
    //   t("property.area.squareMetersRequired")
    // ),
    // contact_address: {
    //   required: Yup.string().required(t("form.contactAddressIsRequired")),
    //   optional: Yup.string().optional().nullable(),
    // },
    // file: Yup.string().required(t("property.fileIsRequired")),
    // building_in_percents: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.buildingInPercentsIsRequired")),
    // building_in_eur: Yup.string().required(
    //   t("property.cost.validation.buildingInEuroIsRequired")
    // ),
    // land_in_percents: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.landInPercentsIsRequired")),
    // property_transfer_tax: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.propertyTransferTaxIsRequired")),
    // real_estate_agent: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.realEstateAgentIsRequired")),
    // notary: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.notaryIsRequired")),
    // due_dilligence: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.dueDilligenceIsRequired")),
    // other: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.otherInPercentsIsRequired")),
    // buffer: Yup.number()
    //   .max(PERCENTAGE_MAX_VALUE, t("maxPercent"))
    //   .min(PERCENTAGE_MIN_VALUE, t("minPercent"))
    //   .required(t("property.cost.validation.bufferInPercentsIsRequired")),
    // maintenance_non_apportionable: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // operating_costs_non_revenueable: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // property_management_non_revenueable: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // depreciation: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // property_value_development: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // own_resources: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // bank_loan: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // interest_on_own_founds: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // interest_bank_loan: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // repayment_bank: Yup.number()
    //   .typeError(t("typeError"))
    //   .min(0, t("minPercent"))
    //   .max(100, t("maxPercent")),
    // inventory_type_id: Yup.string().required(
    //   t("companyOwnership.itemTypeIsRequired")
    // ),
    // brand: Yup.string().required(t("companyOwnership.brandIsRequired")),
    // serial_number: Yup.string().required(
    //   t("companyOwnership.licensePlateSerialNumberIsRequired")
    // ),
    // received_date: {
    //   required: Yup.mixed().required(
    //     t("companyOwnership.receivedOnDateIsRequired")
    //   ),
    //   optional: Yup.mixed().optional().nullable(),
    // },
  };
};

export default useValidation;
