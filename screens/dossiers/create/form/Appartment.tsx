import React, { useState, ReactElement, useRef } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Block, Button, Input, Text, theme, Icon } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../../../constants";
import { HeaderHeight } from "../../../../constants/utils";
import useValidation from "../../../../hooks/useValidation";
import {
  appartmentDealTypes,
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
} from "../utils";
import Form from ".";

const { height, width } = Dimensions.get("window");
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormikValues } from "formik";
import { Tabs } from "../../../../components";
import { DossierTypeIds } from "../../../../utils/constants";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Dossier } from "../types";
import { styles } from "../styles";

const AppartmentForm = ({
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
  return (
    <React.Fragment>
      <Block center>
        <Block
          row
          style={[
            styles.pickerLabel,
            {
              marginTop: 15,
            },
          ]}
        >
          <Icon
            name="business"
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            size={20}
            style={styles.pickerLabelIcon}
          />
          <Text style={styles.pickerLabelText}>Subtype:</Text>
        </Block>
        <Picker
          selectedValue={values.appartmentSubtypeId}
          onValueChange={(value) => setFieldValue("appartmentSubtypeId", value)}
          style={styles.picker}
        >
          {appartmentSubtypes.map(({ id, name }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>
      </Block>
      <Block center>
        <Block row style={[styles.pickerLabel, { marginTop: 15 }]}>
          <Icon
            name="vpn-key"
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            size={20}
            style={styles.pickerLabelIcon}
          />
          <Text style={styles.pickerLabelText}>Deal type:</Text>
        </Block>
        <Picker
          selectedValue={values.appartmentDealTypeId}
          onValueChange={(value) =>
            setFieldValue("appartmentDealTypeId", value)
          }
          style={styles.picker}
        >
          {appartmentDealTypes.map(({ id, name }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>
      </Block>
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
          state.active.appartmentBuildYear ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentBuildYear");
          handleBlur("appartmentBuildYear");
        }}
        onFocus={() => toggleActive("appartmentBuildYear")}
        onChangeText={handleChange("appartmentBuildYear")}
        value={values.appartmentBuildYear}
        bottomHelp
        help={
          touched.appartmentBuildYear &&
          (status?.errors.appartmentBuildYear || errors.appartmentBuildYear)
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
          state.active.appartmentRenovationYear ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentRenovationYear");
          handleBlur("appartmentRenovationYear");
        }}
        onFocus={() => toggleActive("appartmentRenovationYear")}
        onChangeText={handleChange("appartmentRenovationYear")}
        value={values.appartmentRenovationYear}
        bottomHelp
        help={
          touched.appartmentRenovationYear &&
          (status?.errors.appartmentRenovationYear ||
            errors.appartmentRenovationYear)
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
          state.active.appartmentNetLivingAreaInM2 ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentNetLivingAreaInM2");
          handleBlur("appartmentNetLivingAreaInM2");
        }}
        onFocus={() => toggleActive("appartmentNetLivingAreaInM2")}
        onChangeText={handleChange("appartmentNetLivingAreaInM2")}
        value={values.appartmentNetLivingAreaInM2}
        bottomHelp
        help={
          touched.appartmentNetLivingAreaInM2 &&
          (status?.errors.appartmentNetLivingAreaInM2 ||
            errors.appartmentNetLivingAreaInM2)
        }
        icon="roofing"
        family="MaterialIcons"
        iconSize={18}
      />
      <Block center>
        <Block row style={[styles.pickerLabel, { marginTop: 15 }]}>
          <Icon
            name="battery-charging-full"
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            size={20}
            style={styles.pickerLabelIcon}
          />
          <Text style={styles.pickerLabelText}>Energy label:</Text>
        </Block>

        <Picker
          selectedValue={values.appartmentEnergyLabel}
          onValueChange={(value) =>
            setFieldValue("appartmentEnergyLabel", value)
          }
          style={styles.picker}
        >
          {energyLabels.map(({ id, name }) => (
            <Picker.Item key={id} label={name} value={id} />
          ))}
        </Picker>
      </Block>
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Floor number"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentFloorNumber ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentFloorNumber");
          handleBlur("appartmentFloorNumber");
        }}
        onFocus={() => toggleActive("appartmentFloorNumber")}
        onChangeText={handleChange("appartmentFloorNumber")}
        value={values.appartmentFloorNumber}
        bottomHelp
        help={
          touched.appartmentFloorNumber &&
          (status?.errors.appartmentFloorNumber || errors.appartmentFloorNumber)
        }
        icon="stairs"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Number of floors"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentNumberOfFloors ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentNumberOfFloors");
          handleBlur("appartmentNumberOfFloors");
        }}
        onFocus={() => toggleActive("appartmentNumberOfFloors")}
        onChangeText={handleChange("appartmentNumberOfFloors")}
        value={values.appartmentNumberOfFloors}
        bottomHelp
        help={
          touched.appartmentNumberOfFloors &&
          (status?.errors.appartmentNumberOfFloors ||
            errors.appartmentNumberOfFloors)
        }
        icon="stairs"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Number of rooms"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentNumberOfRooms ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentNumberOfRooms");
          handleBlur("appartmentNumberOfRooms");
        }}
        onFocus={() => toggleActive("appartmentNumberOfRooms")}
        onChangeText={handleChange("appartmentNumberOfRooms")}
        value={values.appartmentNumberOfRooms}
        bottomHelp
        help={
          touched.appartmentNumberOfRooms &&
          (status?.errors.appartmentNumberOfRooms ||
            errors.appartmentNumberOfRooms)
        }
        icon="meeting-room"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Number of bathrooms"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentNumberOfBathrooms ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentNumberOfBathrooms");
          handleBlur("appartmentNumberOfBathrooms");
        }}
        onFocus={() => toggleActive("appartmentNumberOfBathrooms")}
        onChangeText={handleChange("appartmentNumberOfBathrooms")}
        value={values.appartmentNumberOfBathrooms}
        bottomHelp
        help={
          touched.appartmentNumberOfBathrooms &&
          (status?.errors.appartmentNumberOfBathrooms ||
            errors.appartmentNumberOfBathrooms)
        }
        icon="bathtub"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Balcony / Terrace (m²)"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentBalconyOrTerraceInM2
            ? styles.inputActive
            : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentBalconyOrTerraceInM2");
          handleBlur("appartmentBalconyOrTerraceInM2");
        }}
        onFocus={() => toggleActive("appartmentBalconyOrTerraceInM2")}
        onChangeText={handleChange("appartmentBalconyOrTerraceInM2")}
        value={values.appartmentBalconyOrTerraceInM2}
        bottomHelp
        help={
          touched.appartmentBalconyOrTerraceInM2 &&
          (status?.errors.appartmentBalconyOrTerraceInM2 ||
            errors.appartmentBalconyOrTerraceInM2)
        }
        icon="deck"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Garden (m²)"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentGardenInM2 ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentGardenInM2");
          handleBlur("appartmentGardenInM2");
        }}
        onFocus={() => toggleActive("appartmentGardenInM2")}
        onChangeText={handleChange("appartmentGardenInM2")}
        value={values.appartmentGardenInM2}
        bottomHelp
        help={
          touched.appartmentGardenInM2 &&
          (status?.errors.appartmentGardenInM2 || errors.appartmentGardenInM2)
        }
        icon="grass"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Garage spaces"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentGarageSpaces ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentGarageSpaces");
          handleBlur("appartmentGarageSpaces");
        }}
        onFocus={() => toggleActive("appartmentGarageSpaces")}
        onChangeText={handleChange("appartmentGarageSpaces")}
        value={values.appartmentGarageSpaces}
        bottomHelp
        help={
          touched.appartmentGarageSpaces &&
          (status?.errors.appartmentGarageSpaces ||
            errors.appartmentGarageSpaces)
        }
        icon="directions-car"
        family="MaterialIcons"
        iconSize={18}
      />
      <Input
        bgColor="transparent"
        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        borderless
        type="decimal-pad"
        color="white"
        placeholder="Outdoor parking spaces"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.appartmentOutdoorParkingSpaces
            ? styles.inputActive
            : null,
        ]}
        onBlur={() => {
          toggleActive("appartmentOutdoorParkingSpaces");
          handleBlur("appartmentOutdoorParkingSpaces");
        }}
        onFocus={() => toggleActive("appartmentOutdoorParkingSpaces")}
        onChangeText={handleChange("appartmentOutdoorParkingSpaces")}
        value={values.appartmentOutdoorParkingSpaces}
        bottomHelp
        help={
          touched.appartmentOutdoorParkingSpaces &&
          (status?.errors.appartmentOutdoorParkingSpaces ||
            errors.appartmentOutdoorParkingSpaces)
        }
        icon="local-parking"
        family="MaterialIcons"
        iconSize={18}
      />
      <Block style={styles.checkboxBlock} row>
        <BouncyCheckbox
          size={25}
          fillColor={materialTheme.COLORS.BUTTON_COLOR}
          textComponent={<Text style={styles.checkboxText}>New building</Text>}
          isChecked={Boolean(values.appartmentNewBuilding)}
          onPress={(isChecked: boolean) => {
            setFieldValue("appartmentNewBuilding", isChecked);
          }}
          style={styles.checkbox}
        />
        <BouncyCheckbox
          size={25}
          fillColor={materialTheme.COLORS.BUTTON_COLOR}
          textComponent={<Text style={styles.checkboxText}>Lift</Text>}
          isChecked={Boolean(values.appartmentLift)}
          onPress={(isChecked: boolean) => {
            setFieldValue("appartmentLift", isChecked);
          }}
        />
      </Block>

      <Block style={styles.checkboxBlock} row>
        <Icon
          name="countertops"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Kitchen: </Text>
      </Block>
      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("appartmentKitchenQualityRate")}
          reviews={qualityRates.map(
            ({ name, description }) => `${name}: ${description}`
          )}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("appartmentKitchenConditionRate")}
          reviews={conditionRates.map(({ name }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>
      <Block style={styles.checkboxBlock} row>
        <Icon
          name="hot-tub"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Bathrooms:: </Text>
      </Block>

      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("appartmentBathroomsQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate(
            "appartmentBathroomsConditionRate"
          )}
          reviews={conditionRates.map(({ name }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>
      <Block style={styles.checkboxBlock} row>
        <Icon
          name="view-day"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Floor: </Text>
      </Block>
      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("appartmentFloorQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("appartmentFloorConditionRate")}
          reviews={conditionRates.map(({ name }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>
      <Block style={styles.checkboxBlock} row>
        <Icon
          name="web-asset"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Windows: </Text>
      </Block>

      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("appartmentWindowsQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("appartmentWindowsConditionRate")}
          reviews={conditionRates.map(({ name }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>

      {/* old */}
    </React.Fragment>
  );
};

export default AppartmentForm;
