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
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import {
  EventArg,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { initCreateDossierValues } from "../utils";
import Form from "../form";
import { handleSignUpSubmit } from "../../signUp/utils";
import { styles } from "../styles";
import { DossierTypes } from "../../../utils/constants";
import { handleCreateDossierSubmit, initCreateDossier } from "./utils";

import { prepareDossierBeforeForm } from "../form/utils";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";
import useOnFocus from "../../../hooks/useOnFocus";
import { FormContext } from "../../../context/Form";

const CreateDossier = ({ navigation }: any): ReactElement => {
  const { property } = useValidation();
  const [createDossierInit, setCreateDossierInit] = useState(initCreateDossier);

  useOnFocus(() => {
    setCreateDossierInit(initCreateDossier);
  });

  const rr = useContext(FormContext);

  return (
    <FormContext.Provider value={{}}>
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
          <DismissKeyboardHOC>
            <Block flex middle>
              <KeyboardAvoidingView
                //behavior={Platform.OS === "ios" ? "padding" : "position"}
                enabled
                keyboardVerticalOffset={0}
              >
                <Formik
                  initialValues={prepareDossierBeforeForm(createDossierInit)}
                  onSubmit={handleCreateDossierSubmit({ navigation })}
                  validationSchema={Yup.object().shape({
                    property,
                  })}
                  enableReinitialize
                >
                  {(props) => <Form {...props} addressText={""}></Form>}
                </Formik>
              </KeyboardAvoidingView>
            </Block>
          </DismissKeyboardHOC>
        </LinearGradient>
      </ScrollView>
    </FormContext.Provider>
  );
};

export default CreateDossier;
