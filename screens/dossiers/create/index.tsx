import React, { useState, ReactElement } from "react";
import {
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { initCreateDossierValues } from "../utils";
import Form from "../form";
import { handleSignUpSubmit } from "../../signUp/utils";
import { styles } from "../styles";
import { DossierTypes } from "../../../utils/constants";
import { handleCreateDossierSubmit, initCreateDossier } from "./utils";

import { prepareDossierBeforeForm } from "../form/utils";
const CreateDossier = (): ReactElement => {
  const { firstName, lastName, password, passwordConfirm, phone, email } =
    useValidation();
  const navigation = useNavigation();

  const [state, setState] = useState<any>({
    active: {
      title: false,
      property: {
        balconyArea: false,
        buildingYear: false,
        floorNumber: false,
        gardenArea: false,
        livingArea: false,
        numberOfBathrooms: false,
        numberOfFloorsInBuilding: false,
        numberOfIndoorParkingSpaces: false,
        numberOfOutdoorParkingSpaces: false,
        numberOfRooms: false,
        renovationYear: false,
      },
    },
  });

  const toggleActive = (name: string) => {
    const { active } = state;
    active[name] = !active[name];
    setState({ active });
  };

  return (
    <ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={["#6C24AA", "#15002B"]}
        style={[
          styles.signup,
          { flex: 1, paddingTop: (theme.SIZES?.BASE || 0) * 4 },
        ]}
      >
        <Block flex middle>
          <KeyboardAvoidingView
            //behavior={Platform.OS === "ios" ? "padding" : "position"}
            enabled
            keyboardVerticalOffset={0}
          >
            <Formik
              initialValues={prepareDossierBeforeForm(initCreateDossier)}
              onSubmit={handleCreateDossierSubmit()}
              validationSchema={Yup.object().shape({
                // firstName,
                // lastName,
                // email,
                // phone,
                // password,
                // passwordConfirm,
              })}
            >
              {(props) => (
                <Form
                  {...props}
                  state={state}
                  toggleActive={toggleActive}
                ></Form>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    </ScrollView>
  );
};

export default CreateDossier;
