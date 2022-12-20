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
  houseSubtypes,
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

const HouseForm = ({
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
          {houseSubtypes.map(({ id, name }) => (
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
          onValueChange={(value) => setFieldValue("houseDealTypeId", value)}
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
          state.active.houseBuildYear ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseBuildYear");
          handleBlur("houseBuildYear");
        }}
        onFocus={() => toggleActive("houseBuildYear")}
        onChangeText={handleChange("houseBuildYear")}
        value={values.houseBuildYear}
        bottomHelp
        help={
          touched.houseBuildYear &&
          (status?.errors.houseBuildYear || errors.houseBuildYear)
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
          state.active.houseRenovationYear ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseRenovationYear");
          handleBlur("houseRenovationYear");
        }}
        onFocus={() => toggleActive("houseRenovationYear")}
        onChangeText={handleChange("houseRenovationYear")}
        value={values.houseRenovationYear}
        bottomHelp
        help={
          touched.houseRenovationYear &&
          (status?.errors.houseRenovationYear || errors.houseRenovationYear)
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
          state.active.houseNetLivingAreaInM2 ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseNetLivingAreaInM2");
          handleBlur("houseNetLivingAreaInM2");
        }}
        onFocus={() => toggleActive("houseNetLivingAreaInM2")}
        onChangeText={handleChange("houseNetLivingAreaInM2")}
        value={values.houseNetLivingAreaInM2}
        bottomHelp
        help={
          touched.houseNetLivingAreaInM2 &&
          (status?.errors.houseNetLivingAreaInM2 ||
            errors.houseNetLivingAreaInM2)
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
        placeholder="Net living area (m²)"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.houseLandAreaInM2 ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseLandAreaInM2");
          handleBlur("houseLandAreaInM2");
        }}
        onFocus={() => toggleActive("houseLandAreaInM2")}
        onChangeText={handleChange("houseLandAreaInM2")}
        value={values.houseLandAreaInM2}
        bottomHelp
        help={
          touched.houseLandAreaInM2 &&
          (status?.errors.houseLandAreaInM2 || errors.houseLandAreaInM2)
        }
        icon="fullscreen"
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
          onValueChange={(value) => setFieldValue("houseEnergyLabel", value)}
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
        placeholder="Number of floors"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.houseNumberOfFloors ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseNumberOfFloors");
          handleBlur("houseNumberOfFloors");
        }}
        onFocus={() => toggleActive("houseNumberOfFloors")}
        onChangeText={handleChange("houseNumberOfFloors")}
        value={values.houseNumberOfFloors}
        bottomHelp
        help={
          touched.houseNumberOfFloors &&
          (status?.errors.houseNumberOfFloors || errors.houseNumberOfFloors)
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
          state.active.houseNumberOfRooms ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseNumberOfRooms");
          handleBlur("houseNumberOfRooms");
        }}
        onFocus={() => toggleActive("houseNumberOfRooms")}
        onChangeText={handleChange("houseNumberOfRooms")}
        value={values.houseNumberOfRooms}
        bottomHelp
        help={
          touched.houseNumberOfRooms &&
          (status?.errors.houseNumberOfRooms || errors.houseNumberOfRooms)
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
          state.active.houseNumberOfBathrooms ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseNumberOfBathrooms");
          handleBlur("houseNumberOfBathrooms");
        }}
        onFocus={() => toggleActive("houseNumberOfBathrooms")}
        onChangeText={handleChange("houseNumberOfBathrooms")}
        value={values.houseNumberOfBathrooms}
        bottomHelp
        help={
          touched.houseNumberOfBathrooms &&
          (status?.errors.houseNumberOfBathrooms ||
            errors.houseNumberOfBathrooms)
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
          state.active.houseBalconyOrTerraceInM2 ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseBalconyOrTerraceInM2");
          handleBlur("houseBalconyOrTerraceInM2");
        }}
        onFocus={() => toggleActive("houseBalconyOrTerraceInM2")}
        onChangeText={handleChange("houseBalconyOrTerraceInM2")}
        value={values.houseBalconyOrTerraceInM2}
        bottomHelp
        help={
          touched.houseBalconyOrTerraceInM2 &&
          (status?.errors.houseBalconyOrTerraceInM2 ||
            errors.houseBalconyOrTerraceInM2)
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
        placeholder="Garage spaces"
        autoCapitalize="none"
        style={[
          styles.input,
          state.active.houseGarageSpaces ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseGarageSpaces");
          handleBlur("houseGarageSpaces");
        }}
        onFocus={() => toggleActive("houseGarageSpaces")}
        onChangeText={handleChange("houseGarageSpaces")}
        value={values.houseGarageSpaces}
        bottomHelp
        help={
          touched.houseGarageSpaces &&
          (status?.errors.houseGarageSpaces || errors.houseGarageSpaces)
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
          state.active.houseOutdoorParkingSpaces ? styles.inputActive : null,
        ]}
        onBlur={() => {
          toggleActive("houseOutdoorParkingSpaces");
          handleBlur("houseOutdoorParkingSpaces");
        }}
        onFocus={() => toggleActive("houseOutdoorParkingSpaces")}
        onChangeText={handleChange("houseOutdoorParkingSpaces")}
        value={values.houseOutdoorParkingSpaces}
        bottomHelp
        help={
          touched.houseOutdoorParkingSpaces &&
          (status?.errors.houseOutdoorParkingSpaces ||
            errors.houseOutdoorParkingSpaces)
        }
        icon="local-parking"
        family="MaterialIcons"
        iconSize={18}
      />
      <Block
        style={[styles.checkboxBlock, { justifyContent: "space-between" }]}
        row
      >
        <BouncyCheckbox
          size={25}
          fillColor={materialTheme.COLORS.BUTTON_COLOR}
          textComponent={<Text style={styles.checkboxText}>New building</Text>}
          isChecked={Boolean(values.houseNewBuilding)}
          onPress={(isChecked: boolean) => {
            setFieldValue("houseNewBuilding", isChecked);
          }}
          //style={styles.checkbox}
        />
        <BouncyCheckbox
          size={25}
          fillColor={materialTheme.COLORS.BUTTON_COLOR}
          textComponent={<Text style={styles.checkboxText}>Pool</Text>}
          isChecked={Boolean(values.housePool)}
          onPress={(isChecked: boolean) => {
            setFieldValue("housePool", isChecked);
          }}
        />
        <BouncyCheckbox
          size={25}
          fillColor={materialTheme.COLORS.BUTTON_COLOR}
          textComponent={<Text style={styles.checkboxText}>Sauna</Text>}
          isChecked={Boolean(values.houseSauna)}
          onPress={(isChecked: boolean) => {
            setFieldValue("houseSauna", isChecked);
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
          onFinishRating={handleQualityRate("houseKitchenQualityRate")}
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
          onFinishRating={handleConditionRate("houseKitchenConditionRate")}
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
          onFinishRating={handleQualityRate("houseBathroomsQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("houseBathroomsConditionRate")}
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
          onFinishRating={handleQualityRate("houseFloorQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("houseFloorConditionRate")}
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
          onFinishRating={handleQualityRate("houseWindowsQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("houseWindowsConditionRate")}
          reviews={conditionRates.map(({ name }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
      </Block>

      <Block style={styles.checkboxBlock} row>
        <Icon
          name="wb-shade"
          color={materialTheme.COLORS.PLACEHOLDER}
          family="MaterialIcons"
          size={20}
          style={styles.pickerLabelIcon}
        />
        <Text style={styles.ratingBlockTitle}>Masonry: </Text>
      </Block>

      <Block center style={[styles.ratingBlock]}>
        <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
        <AirbnbRating
          count={qualityRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleQualityRate("houseMasonryQualityRate")}
          reviews={qualityRates.map(({ name, description }) => name)}
          defaultRating={defaultRating}
          reviewSize={RATING_REVIEW_SIZE}
          size={RATING_SIZE}
        />
        <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
        <AirbnbRating
          count={conditionRates.length}
          ratingContainerStyle={styles.ratingContainerStyle}
          onFinishRating={handleConditionRate("houseMasonryConditionRate")}
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

export default HouseForm;
