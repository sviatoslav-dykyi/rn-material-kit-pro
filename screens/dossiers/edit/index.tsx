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
import Form from "../form";
import { styles } from "../styles";
import { Dossier } from "../types";
import { fetchDossier, handleEditDossierSubmit } from "./utils";
import { materialTheme } from "../../../constants";
import { GOOGLE_API_KEY, prepareDossierBeforeForm } from "../form/utils";
import useOnFocus from "../../../hooks/useOnFocus";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";

const EditDossier = (): ReactElement => {
  const {
    property,
    firstName,
    lastName,
    password,
    passwordConfirm,
    phone,
    email,
  } = useValidation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoaing, setIsLoading] = useState(false);
  const [addressText, setAddressText] = useState("");

  useOnFocus(() => fetchDossier({ setDossier, setIsLoading, id }));

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
    //console.log("jsonAdd", json.results[0].formatted_address);
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
        style={[styles.signup, { flex: 1, paddingTop: 0 }]}
      >
        <DismissKeyboardHOC>
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
                  onSubmit={handleEditDossierSubmit({ navigation })}
                  validationSchema={Yup.object().shape({
                    property,
                  })}
                >
                  {(props) => (
                    <Form
                      {...props}
                      mode="edit"
                      addressText={addressText}
                    ></Form>
                  )}
                </Formik>
              )}
            </KeyboardAvoidingView>
          </Block>
        </DismissKeyboardHOC>
      </LinearGradient>
    </ScrollView>
  );
};

export default EditDossier;
