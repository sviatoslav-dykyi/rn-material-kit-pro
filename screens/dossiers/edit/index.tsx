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
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { initCreateDossierValues } from "../utils";
import Form from "../form";
import { handleSignUpSubmit } from "../../signUp/utils";
import { styles } from "../styles";
import { Dossier } from "../types";
import { fetchDossier, handleEditDossierSubmit } from "./utils";
import { materialTheme } from "../../../constants";
import { GOOGLE_API_KEY, prepareDossierBeforeForm } from "../form/utils";

const EditDossier = (): ReactElement => {
  const { firstName, lastName, password, passwordConfirm, phone, email } =
    useValidation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  console.log("route1", route);
  const id = route?.params?.id;
  console.log("id", id);

  const [dossier, setDossier] = useState<Dossier>();
  const [isLoaing, setIsLoading] = useState(false);
  const [addressText, setAddressText] = useState("");

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

  useEffect(() => {
    fetchDossier({ setDossier, setIsLoading, id });
  }, [id]);

  const toggleActive = (name: string) => {
    const { active } = state;
    active[name] = !active[name];
    setState({ active });
  };

  const getGoogleAddress = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      {
        method: "GET",
        // mode: "cors",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        // body: JSON.stringify(body),
      }
    );
    const json = await response.json();
    console.log("jsonAdd", json.results[0].formatted_address);
    setAddressText(json.results[0].formatted_address);
    //console.log("jsonAdd", json.results[0].formatted_address);
  };

  useEffect(() => {
    if (!dossier) return;
    const {
      property: {
        location: {
          coordinates: { latitude, longitude },
        },
      },
    } = dossier;
    dossier && getGoogleAddress(latitude, longitude);
  }, [dossier]);

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
            {dossier && (
              <Formik
                initialValues={prepareDossierBeforeForm(dossier)}
                //onSubmit={() => {}}
                enableReinitialize
                onSubmit={handleEditDossierSubmit()}
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
                    mode="edit"
                    addressText={addressText}
                  ></Form>
                )}
              </Formik>
            )}
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    </ScrollView>
  );
};

export default EditDossier;
