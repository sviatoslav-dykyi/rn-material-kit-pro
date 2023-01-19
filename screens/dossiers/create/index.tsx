import React, {
  useState,
  ReactElement,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from "react-native";
import { Formik } from "formik";
import { Block, Button, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import {
  EventArg,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  appartmentSubtypes,
  dealTypes,
  energyLabels,
  initCreateDossierValues,
} from "../utils";
import Form from "../form";
import { handleSignUpSubmit } from "../../signUp/utils";
import { styles } from "../styles";
import { DossierTypes } from "../../../utils/constants";
import { handleCreateDossierSubmit, initCreateDossier } from "./utils";

import { prepareDossierBeforeForm } from "../form/utils";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";
import useOnFocus from "../../../hooks/useOnFocus";
import { FormContext } from "../../../context/Form";
import { materialTheme } from "../../../constants";
import { HelperText, TextInput } from "react-native-paper";

const CreateDossier = ({ navigation }: any): ReactElement => {
  const { property } = useValidation();
  const [createDossierInit] = useState(initCreateDossier);
  const [openSubtype, setOpenSubtype] = useState(false);
  const [openDealtype, setOpenDealtype] = useState(false);
  const [openEnergyLabel, setOpenEnergyLabel] = useState(false);
  const [subtype, setSubtype] = useState("");
  const [dealType, setDealType] = useState("");
  const [energyLabel, setEnergyLabel] = useState("");
  const [itemsSubtype, setItemsSubtype] = useState(appartmentSubtypes);
  const [itemsDealtype, setItemsDealtype] = useState(dealTypes);
  const [itemsEnergyLabel, setItemsEnergyLabel] = useState(energyLabels);
  console.log("CreateDossier rendered");
  const [addressText, setAddressText] = useState("");

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     console.log("address text reseted");
  //     setAddressText("");
  //   }
  // }, [isFocused]);

  const handleCloseSubtype = (): void => setOpenSubtype(false);

  const handleCloseDealtype = (): void => setOpenDealtype(false);

  const handleCloseEnergyLabel = (): void => setOpenEnergyLabel(false);

  const handleCloseDropdownPickers = (): void => {
    handleCloseSubtype();
    handleCloseDealtype();
    handleCloseEnergyLabel();
  };

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

  // const auxDossierValues = { subtype, dealType, energyLabel };
  // console.log("dealType", dealType);

  return (
    <FormContext.Provider
      value={{
        openSubtype,
        setOpenSubtype,
        openDealtype,
        setOpenDealtype,
        openEnergyLabel,
        setOpenEnergyLabel,
        subtype,
        setSubtype,
        dealType,
        setDealType,
        energyLabel,
        setEnergyLabel,
        itemsSubtype,
        setItemsSubtype,
        itemsDealtype,
        setItemsDealtype,
        itemsEnergyLabel,
        setItemsEnergyLabel,
        handleCloseDropdownPickers,
      }}
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
          <Formik
            initialValues={prepareDossierBeforeForm(createDossierInit)}
            onSubmit={handleCreateDossierSubmit({
              navigation,
            })}
            validationSchema={Yup.object().shape({
              property,
            })}
            enableReinitialize
          >
            {(props) => <Form {...props} addressText={addressText}></Form>}
          </Formik>
        </KeyboardAvoidingView>
      </LinearGradient>
    </FormContext.Provider>
  );
};

export default CreateDossier;
