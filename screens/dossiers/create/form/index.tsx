import React, { useState, ReactElement } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { Block, Button, Input, Text, theme, Card } from "galio-framework";

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
import AppartmentForm from "./Appartment";

const CreateDossiersForm = ({
  handleChange,
  handleBlur,
  values,
  submitForm,
  touched,
  status,
  errors,
  setFieldValue,
  state,
  toggleActive,
}: FormikValues): ReactElement => {
  const navigation = useNavigation();
  const handleQualityRate = (field: keyof Dossier) => (rating: number) =>
    setFieldValue(field, Number(rating));

  const handleConditionRate = (field: string) => (rating: number) =>
    setFieldValue(field, Number(rating));

  return (
    <Block flex={1} center space="between">
      <Block center>
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Title"
          autoCapitalize="none"
          style={[styles.input, state.active.title ? styles.inputActive : null]}
          onBlur={() => {
            toggleActive("title");
            handleBlur("title");
          }}
          onFocus={() => toggleActive("title")}
          onChangeText={handleChange("title")}
          value={values.title}
          bottomHelp
          help={touched.title && (status?.errors.title || errors.title)}
          icon="article"
          family="MaterialIcons"
          iconSize={18}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Address"
          autoCapitalize="none"
          style={[
            styles.input,
            state.active.address ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("address");
            handleBlur("address");
          }}
          onFocus={() => toggleActive("address")}
          onChangeText={handleChange("address")}
          value={values.address}
          bottomHelp
          help={touched.address && (status?.errors.address || errors.address)}
          icon="location-on"
          family="MaterialIcons"
          iconSize={18}
        />
        <Block row style={styles.typesBlock}>
          {dossierTypes.map(({ id, name }) => (
            <Button
              key={id}
              style={[
                styles.typesButtons,
                values.typeId == id && styles.selected,
              ]}
              size="small"
              onPress={() => setFieldValue("typeId", id)}
            >
              {name}
            </Button>
          ))}
        </Block>
        {values.typeId === DossierTypeIds.APPARTMENT && (
          <AppartmentForm
            {...{
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
            }}
          />
        )}
      </Block>
      <Block flex center style={{ marginTop: 20 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => {
            submitForm();
          }}
        >
          CREATE
        </Button>
        <Button
          size="large"
          color="transparent"
          shadowless
          onPress={() => navigation.navigate("Sign In" as never)}
        >
          <Text
            center
            color={theme.COLORS?.WHITE}
            size={(theme.SIZES?.FONT || 0) * 0.75}
          >
            Already have an account? Sign In
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default CreateDossiersForm;
