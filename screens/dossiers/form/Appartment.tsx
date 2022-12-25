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
  GestureResponderEvent,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Block, Button, Input, Text, theme, Icon } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../../constants";
import { HeaderHeight } from "../../../constants/utils";
import useValidation from "../../../hooks/useValidation";
import Rating from "./Rating";
import {
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
  dealTypes,
} from "../utils";
import Form from ".";
import { getConditionRatingIndex, getQualityRatingIndex } from "./utils";
const { height, width } = Dimensions.get("window");
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormikValues } from "formik";
import { Tabs } from "../../../components";
import { DossierTypeIds, DossierTypes } from "../../../utils/constants";
import { AirbnbRating } from "react-native-ratings";
import { Dossier } from "../types";
import { styles } from "../styles";
import { useEvent } from "react-native-reanimated";

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
  const [openSubtype, setOpenSubtype] = useState(false);
  const [openDealtype, setOpenDealtype] = useState(false);
  const [openEnergyLabel, setOpenEnergyLabel] = useState(false);
  const [subtype, setSubtype] = useState(values.property.propertyType.subcode);
  const [dealtype, setDealtype] = useState(values.dealType);
  const [energyLabel, setEnergyLabel] = useState(values.property.energyLabel);
  const [itemsSubtype, setItemsSubtype] = useState(appartmentSubtypes);
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
      <>
        {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}
        <Block center style={{ zIndex: 1 }}>
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
          <Block
            style={[
              styles.dropDownPickerBlock,
              { zIndex: openSubtype ? 3 : 1 },
            ]}
          >
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openSubtype}
              value={subtype}
              items={itemsSubtype}
              setOpen={setOpenSubtype}
              setValue={setSubtype}
              setItems={setItemsSubtype}
              theme="DARK"
              multiple={false}
              containerProps={styles.dropDownPickerContainer as any}
              maxHeight={1500}
            />
          </Block>
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
          <Block
            style={[
              styles.dropDownPickerBlock,
              { zIndex: openSubtype ? 3 : 1 },
            ]}
          >
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openDealtype}
              value={dealtype}
              items={itemsDealtype}
              setOpen={setOpenDealtype}
              setValue={setDealtype}
              setItems={setItemsDealtype}
              theme="DARK"
              multiple={false}
              containerProps={styles.dropDownPickerContainer as any}
              maxHeight={1500}
            />
          </Block>
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
            state.active.property.buildingYear ? styles.inputActive : null,
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
            state.active.property.renovationYear ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("property.renovationYear");
            handleBlur("property.renovationYear");
          }}
          onFocus={() => toggleActive("property.renovationYear")}
          onChangeText={handleChange("property.renovationYear")}
          value={values.property.renovationYear}
          bottomHelp
          help={
            touched.property?.renovationYear &&
            (status?.errors?.property?.renovationYear ||
              errors?.property?.renovationYear)
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
            (status?.errors?.property?.livingArea ||
              errors?.property?.livingArea)
          }
          icon="roofing"
          family="MaterialIcons"
          iconSize={18}
        />
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
        <Block
          style={[styles.dropDownPickerBlock, { zIndex: openSubtype ? 3 : 1 }]}
        >
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={openEnergyLabel}
            value={energyLabel}
            items={itemsEnergyLabel}
            setOpen={setOpenEnergyLabel}
            setValue={setEnergyLabel}
            setItems={setItemsEnergyLabel}
            theme="DARK"
            multiple={false}
            containerProps={styles.dropDownPickerContainer as any}
            maxHeight={1500}
          />
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
            state.active.property.floorNumber ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("property.floorNumber");
            handleBlur("property.floorNumber");
          }}
          onFocus={() => toggleActive("property.floorNumber")}
          onChangeText={handleChange("property.floorNumber")}
          value={values.property.floorNumber}
          bottomHelp
          help={
            touched.property?.floorNumber &&
            (status?.errors?.property?.floorNumber ||
              errors?.property?.floorNumber)
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
            state.active.property.numberOfFloorsInBuilding
              ? styles.inputActive
              : null,
          ]}
          onBlur={() => {
            toggleActive("property.numberOfFloorsInBuilding");
            handleBlur("property.numberOfFloorsInBuilding");
          }}
          onFocus={() => toggleActive("property.numberOfFloorsInBuilding")}
          onChangeText={handleChange("property.numberOfFloorsInBuilding")}
          value={values.property.numberOfFloorsInBuilding}
          bottomHelp
          help={
            touched.property?.numberOfFloorsInBuilding &&
            (status?.errors?.property.numberOfFloorsInBuilding ||
              errors?.property?.numberOfFloorsInBuilding)
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
            toggleActive("property.numberOfRooms");
            handleBlur("property.numberOfRooms");
          }}
          onFocus={() => toggleActive("property.numberOfRooms")}
          onChangeText={handleChange("property.numberOfRooms")}
          value={values.property.numberOfRooms}
          bottomHelp
          help={
            touched.property?.numberOfRooms &&
            (status?.errors?.property.numberOfRooms ||
              errors?.property?.numberOfRooms)
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
            state.active.property.numberOfBathrooms ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("property.numberOfBathrooms");
            handleBlur("property.numberOfBathrooms");
          }}
          onFocus={() => toggleActive("property.numberOfBathrooms")}
          onChangeText={handleChange("property.numberOfBathrooms")}
          value={values.property.numberOfBathrooms}
          bottomHelp
          help={
            touched.property?.numberOfBathrooms &&
            (status?.errors?.property.numberOfBathrooms ||
              errors?.property?.numberOfBathrooms)
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
            state.active.property.balconyArea ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("property.balconyArea");
            handleBlur("property.balconyArea");
          }}
          onFocus={() => toggleActive("property.balconyArea")}
          onChangeText={handleChange("property.balconyArea")}
          value={values.property.balconyArea}
          bottomHelp
          help={
            touched.property?.balconyArea &&
            (status?.errors?.property?.balconyArea ||
              errors?.property?.balconyArea)
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
            state.active.property.gardenArea ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("property.gardenArea");
            handleBlur("property.gardenArea");
          }}
          onFocus={() => toggleActive("property.gardenArea")}
          onChangeText={handleChange("property.gardenArea")}
          value={values.property.gardenArea}
          bottomHelp
          help={
            touched.property?.gardenArea &&
            (status?.errors?.property?.gardenArea ||
              errors?.property?.gardenArea)
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
              errors?.appartmentGarageSpaces)
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
            state.active.property.numberOfOutdoorParkingSpaces
              ? styles.inputActive
              : null,
          ]}
          onBlur={() => {
            toggleActive("property.numberOfOutdoorParkingSpaces");
            handleBlur("property.numberOfOutdoorParkingSpaces");
          }}
          onFocus={() => toggleActive("property.numberOfOutdoorParkingSpaces")}
          onChangeText={handleChange("property.numberOfOutdoorParkingSpaces")}
          value={values.property.numberOfOutdoorParkingSpaces}
          bottomHelp
          help={
            touched.property?.numberOfOutdoorParkingSpaces &&
            (status?.errors?.property.numberOfOutdoorParkingSpaces ||
              errors?.property?.numberOfOutdoorParkingSpaces)
          }
          icon="local-parking"
          family="MaterialIcons"
          iconSize={18}
        />
        <Block style={styles.checkboxBlock} row>
          <BouncyCheckbox
            size={25}
            fillColor={materialTheme.COLORS.BUTTON_COLOR}
            textComponent={
              <Text style={styles.checkboxText}>New building</Text>
            }
            isChecked={Boolean(values.isNew)}
            onPress={(isChecked: boolean) => {
              setFieldValue("isNew", isChecked);
            }}
            style={styles.checkbox}
          />
          <BouncyCheckbox
            size={25}
            fillColor={materialTheme.COLORS.BUTTON_COLOR}
            textComponent={<Text style={styles.checkboxText}>Lift</Text>}
            isChecked={Boolean(values.hasLift)}
            onPress={(isChecked: boolean) => {
              setFieldValue("hasLift", isChecked);
            }}
          />
        </Block>
        <Rating
          values={values}
          handleQualityRate={handleQualityRate}
          handleConditionRate={handleConditionRate}
          type={DossierTypes.APARTMENT}
        />
        {/* <Block style={styles.checkboxBlock} row>
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
            onFinishRating={handleQualityRate("property.quality.kitchen")}
            reviews={qualityRates.map(
              ({ label, description }) => `${label}: ${description}`
            )}
            defaultRating={getQualityRatingIndex("property.quality.kitchen")}
            reviewSize={RATING_REVIEW_SIZE}
            size={RATING_SIZE}
          />
          <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
          <AirbnbRating
            count={conditionRates.length}
            ratingContainerStyle={styles.ratingContainerStyle}
            onFinishRating={handleConditionRate("property.condition.kitchen")}
            reviews={conditionRates.map(({ label }) => label)}
            defaultRating={getConditionRatingIndex(
              "property.condition.kitchen"
            )}
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
          <Text style={styles.ratingBlockTitle}>Bathrooms: </Text>
        </Block>

        <Block center style={[styles.ratingBlock]}>
          <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
          <AirbnbRating
            count={qualityRates.length}
            ratingContainerStyle={styles.ratingContainerStyle}
            onFinishRating={handleQualityRate("property.quality.bathrooms")}
            reviews={qualityRates.map(({ label, description }) => label)}
            defaultRating={getQualityRatingIndex("property.quality.bathrooms")}
            reviewSize={RATING_REVIEW_SIZE}
            size={RATING_SIZE}
          />
          <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
          <AirbnbRating
            count={conditionRates.length}
            ratingContainerStyle={styles.ratingContainerStyle}
            onFinishRating={handleConditionRate("property.condition.bathrooms")}
            reviews={conditionRates.map(({ label }) => label)}
            defaultRating={getConditionRatingIndex(
              "property.condition.bathrooms"
            )}
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
            onFinishRating={handleQualityRate(values.property.quality.flooring)}
            reviews={qualityRates.map(({ label }) => label)}
            defaultRating={getQualityRatingIndex(
              values.property.quality.flooring
            )}
            reviewSize={RATING_REVIEW_SIZE}
            size={RATING_SIZE}
          />
          <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
          <AirbnbRating
            count={conditionRates.length}
            ratingContainerStyle={styles.ratingContainerStyle}
            onFinishRating={handleConditionRate(
              values.property.condition.flooring
            )}
            reviews={conditionRates.map(({ label }) => label)}
            defaultRating={getConditionRatingIndex(
              "property.condition.flooring"
            )}
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
            onFinishRating={handleQualityRate(values.property.quality.windows)}
            reviews={qualityRates.map(({ label }) => label)}
            defaultRating={getQualityRatingIndex(
              values.property.quality.windows
            )}
            reviewSize={RATING_REVIEW_SIZE}
            size={RATING_SIZE}
          />
          <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
          <AirbnbRating
            count={conditionRates.length}
            ratingContainerStyle={styles.ratingContainerStyle}
            onFinishRating={handleConditionRate(
              values.property.condition.windows
            )}
            reviews={conditionRates.map(({ label }) => label)}
            defaultRating={getConditionRatingIndex(
              values.property.condition.windows
            )}
            reviewSize={RATING_REVIEW_SIZE}
            size={RATING_SIZE}
          />
        </Block> */}
      </>
      {/* old */}
    </TouchableOpacity>
  );
};

export default AppartmentForm;
