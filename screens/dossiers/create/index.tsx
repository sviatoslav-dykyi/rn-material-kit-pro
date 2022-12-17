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
import { initCreateDossierValues } from "./utils";
import Form from "./form";
import { handleSignUpSubmit } from "../../signUp/utils";
import { styles } from "./styles";

const CreateDossier = (): ReactElement => {
  const { firstName, lastName, password, passwordConfirm, phone, email } =
    useValidation();
  const navigation = useNavigation();

  const [state, setState] = useState<any>({
    active: {
      title: false,
      address: false,
      appartmentBuildYear: false,
      appartmentRenovationYear: false,
      appartmentNetLivingAreaInM2: false,
      appartmentFloorNumber: false,
      appartmentNumberOfFloors: false,
      appartmentNumberOfRooms: false,
      appartmentNumberOfBathrooms: false,
      appartmentBalconyOrTerraceInM2: false,
      appartmentGardenInM2: false,
      appartmentGarageSpaces: false,
      appartmentOutdoorParkingSpaces: false,
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
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            enabled
            keyboardVerticalOffset={0}
          >
            <Formik
              initialValues={initCreateDossierValues}
              //onSubmit={() => {}}
              onSubmit={handleSignUpSubmit({ navigation })}
              validationSchema={Yup.object().shape({
                firstName,
                lastName,
                email,
                phone,
                password,
                passwordConfirm,
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
