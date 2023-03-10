import React, { useState, ReactElement, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Form from "../form";
import { styles } from "../styles";
import {
  AppartmentSubtype,
  Dossier,
  DossierSubtype,
  HouseSubtype,
} from "../types";
import { fetchDossier, handleEditDossierSubmit } from "./utils";
import { materialTheme } from "../../../constants";
import { GOOGLE_API_KEY, prepareDossierBeforeForm } from "../form/utils";
import useOnFocus from "../../../hooks/useOnFocus";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";
import {
  appartmentSubtypes,
  dealTypes,
  energyLabels,
  houseSubtypes,
} from "../utils";
import { FormContext } from "../../../context/Form";
import { DossierTypes } from "../../../utils/constants";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
const EditDossier = (): ReactElement => {
  const { property } = useValidation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoaing, setIsLoading] = useState(false);

  // const [openSubtype, setOpenSubtype] = useState(false);
  // const [openDealtype, setOpenDealtype] = useState(false);
  // const [openEnergyLabel, setOpenEnergyLabel] = useState(false);
  // const [subtype, setSubtype] = useState("");
  // const [dealType, setDealType] = useState("");
  // const [energyLabel, setEnergyLabel] = useState("");
  // const [itemsSubtype, setItemsSubtype] = useState<DossierSubtype[]>([]);
  // const [itemsDealtype, setItemsDealtype] = useState(dealTypes);
  // const [itemsEnergyLabel, setItemsEnergyLabel] = useState(energyLabels);

  //const isFocused = useIsFocused();

  // const subtypesDict: Record<DossierTypes, DossierSubtype[]> = {
  //   apartment: appartmentSubtypes,
  //   house: houseSubtypes,
  //   multi_family_house: [],
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     console.log("address text reseted");
  //     setAddressText("");
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   if (!dossier) return;
  //   setDealType(dossier?.dealType || "");
  //   setSubtype(dossier.property.propertyType?.subcode || "");
  //   setEnergyLabel(dossier.property?.energyLabel || "");
  //   setItemsSubtype(subtypesDict[dossier.property.propertyType.code]);
  // }, [dossier]);

  // const handleCloseSubtype = (): void => setOpenSubtype(false);

  // const handleCloseDealtype = (): void => setOpenDealtype(false);

  // const handleCloseEnergyLabel = (): void => setOpenEnergyLabel(false);

  // const handleCloseDropdownPickers = (): void => {
  //   handleCloseSubtype();
  //   handleCloseDealtype();
  //   handleCloseEnergyLabel();
  // };

  // useEffect(() => {
  //   if (openSubtype) {
  //     handleCloseDropdownPickers();
  //     setOpenSubtype(true);
  //   }
  // }, [openSubtype]);

  // useEffect(() => {
  //   if (openDealtype) {
  //     handleCloseDropdownPickers();
  //     setOpenDealtype(true);
  //   }
  // }, [openDealtype]);

  // useEffect(() => {
  //   if (openEnergyLabel) {
  //     handleCloseDropdownPickers();
  //     setOpenEnergyLabel(true);
  //   }
  // }, [openEnergyLabel]);

  useEffect(() => {
    fetchDossier({ setDossier, setIsLoading, id });
  }, []);

  if (isLoaing) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator
          size="large"
          color={materialTheme.COLORS.BUTTON_COLOR}
        />
      </View>
    );
  }
  dossier && console.log("dossier clear", dossier);
  dossier &&
    console.log("dossier?.property", prepareDossierBeforeForm(dossier));

  return (
    <FormContext.Provider
      value={
        {
          // openSubtype,
          // setOpenSubtype,
          // openDealtype,
          // setOpenDealtype,
          // openEnergyLabel,
          // setOpenEnergyLabel,
          // subtype,
          // setSubtype,
          // dealType,
          // setDealType,
          // energyLabel,
          // setEnergyLabel,
          // itemsSubtype,
          // setItemsSubtype,
          // itemsDealtype,
          // setItemsDealtype,
          // itemsEnergyLabel,
          // setItemsEnergyLabel,
          // handleCloseDropdownPickers,
        }
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={["#6C24AA", "#15002B"]}
        style={[styles.signup, { flex: 1 }]}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          {dossier && (
            <Formik
              initialValues={prepareDossierBeforeForm(dossier)}
              enableReinitialize
              onSubmit={handleEditDossierSubmit({ navigation })}
              validationSchema={Yup.object().shape({
                property,
              })}
            >
              {(props) => <Form {...props} mode="edit"></Form>}
            </Formik>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
    </FormContext.Provider>
  );
};

export default EditDossier;
