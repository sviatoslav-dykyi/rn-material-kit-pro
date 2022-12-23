import React, { useState, ReactElement, useRef, useEffect } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Block, Button, Input, Text, theme, Icon } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../../constants";
import { HeaderHeight } from "../../../constants/utils";
import useValidation from "../../../hooks/useValidation";
import {
  dealTypes,
  appartmentSubtypes,
  defaultRating,
  dossierTypeIdInit,
  dossierTypes,
  energyLabels,
  qualityRates,
  conditionRates,
  RATING_REVIEW_SIZE,
  RATING_SIZE,
  MIN_HEIGHT_RICH_CONTAINER,
  houseSubtypes,
} from "../utils";
import Form from ".";

const { height, width } = Dimensions.get("window");
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormikValues } from "formik";
import { Tabs } from "../../../components";
import { DossierTypeIds } from "../../../utils/constants";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Dossier } from "../types";
import { styles } from "../styles";
import DropDownPicker from "react-native-dropdown-picker";

const MultiFamilyHouseForm = ({
  handleChange,
  handleBlur,
  values,
  touched,
  status,
  errors,
  setFieldValue,
  state,
  toggleActive,
  handleQualityRate,
  handleConditionRate,
}: FormikValues): ReactElement => {
  const [openSubtype, setOpenSubtype] = useState(false);
  const [openDealtype, setOpenDealtype] = useState(false);
  const [openEnergyLabel, setOpenEnergyLabel] = useState(false);
  const [subtype, setSubtype] = useState(values.property.propertyType.subcode);
  const [dealtype, setDealtype] = useState(values.dealType);
  const [energyLabel, setEnergyLabel] = useState(values.energyLabel);
  const [itemsSubtype, setItemsSubtype] = useState(houseSubtypes);
  const [itemsDealtype, setItemsDealtype] = useState(dealTypes);
  const [itemsEnergyLabel, setItemsEnergyLabel] = useState(energyLabels);
  useEffect(() => {
    setFieldValue("dealType", dealtype);
  }, [dealtype]);

  useEffect(() => {
    setFieldValue("property.propertyType.subcode", subtype);
  }, [subtype]);

  useEffect(() => {
    setFieldValue("energyLabel", energyLabel);
  }, [energyLabel]);

  useEffect(() => {
    if (openSubtype) {
      handleCloseDropdownPickers();
      setOpenSubtype(true);
    }
  }, [openSubtype]);

  useEffect(() => {
    if (openDealtype) {
      handleCloseDropdownPickers();
      setOpenDealtype(true);
    }
  }, [openDealtype]);

  useEffect(() => {
    if (openEnergyLabel) {
      handleCloseDropdownPickers();
      setOpenEnergyLabel(true);
    }
  }, [openEnergyLabel]);

  const handleCloseSubtype = (): void => setOpenSubtype(false);

  const handleCloseDealtype = (): void => setOpenDealtype(false);

  const handleCloseEnergyLabel = (): void => setOpenEnergyLabel(false);

  const handleCloseDropdownPickers = (): void => {
    handleCloseSubtype();
    handleCloseDealtype();
    handleCloseEnergyLabel();
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleCloseDropdownPickers}>
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Building year"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.houseBuildYear ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("property.buildingYear");
          handleBlur("property.buildingYear");
        }}
        onFocus={() => toggleActive("property.buildingYear")}
        onChangeText={handleChange("property.buildingYear")}
        value={values.property.buildingYear}
        bottomHelp
        help={
          touched.property?.buildingYear &&
          (status?.errors?.property?.buildingYear ||
            errors?.property?.buildingYear)
        }
        icon="build"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Renovation year"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.property.number_of_residential_units
            ? styles.inputActive
            : null,
        ]}
        onBlur={() => {
          toggleActive("property.number_of_residential_units");
          handleBlur("property.number_of_residential_units");
        }}
        onFocus={() => toggleActive("property.number_of_residential_units")}
        onChangeText={handleChange("property.number_of_residential_units")}
        value={values.property.number_of_residential_units}
        bottomHelp
        help={
          touched.property?.number_of_residential_units &&
          (status?.errors?.property.number_of_residential_units ||
            errors?.property?.number_of_residential_units)
        }
        icon="handyman"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Net living area (m²)"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.property.livingArea ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("property.livingArea");
          handleBlur("property.livingArea");
        }}
        onFocus={() => toggleActive("property.livingArea")}
        onChangeText={handleChange("property.livingArea")}
        value={values.property.livingArea}
        bottomHelp
        help={
          touched.property?.livingArea &&
          (status?.errors?.property?.livingArea || errors?.property?.livingArea)
        }
        icon="roofing"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Land area (m²)"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.property.landArea ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("property.landArea");
          handleBlur("property.landArea");
        }}
        onFocus={() => toggleActive("property.landArea")}
        onChangeText={handleChange("property.landArea")}
        value={values.property.landArea}
        bottomHelp
        help={
          touched.property?.landArea &&
          (status?.errors?.property?.landArea || errors?.property?.landArea)
        }
        icon="fullscreen"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Annual net rent income (EUR) "
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.property.annualRentIncome ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("property.annualRentIncome");
          handleBlur("property.annualRentIncome");
        }}
        onFocus={() => toggleActive("property.annualRentIncome")}
        onChangeText={handleChange("property.annualRentIncome")}
        value={values.property.annualRentIncome}
        bottomHelp
        help={
          touched.property?.annual_net_rent_income &&
          (status?.errors?.property.annual_net_rent_income ||
            errors?.property?.annual_net_rent_income)
        }
        icon="fullscreen"
        family="MaterialIcons"
        iconSize={18}
      />
      <Block style={styles.checkboxBlock} row>
        <Icon
          name="view-day"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Building: </Text>
      </Block>
      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("property.quality.flooring")}
          reviews={qualityRates.map(({ label }) => label)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("property.condition.flooring")}
          reviews={conditionRates.map(({ label }) => label)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default MultiFamilyHouseForm;