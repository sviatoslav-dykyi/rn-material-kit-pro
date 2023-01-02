import React, { ReactElement, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { Formik } from "formik";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import { handleForgotPasswordSubmit, initForgotPasswordValues } from "./utils";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

const ForgotPassword = (): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const { email } = useValidation();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#6C24AA", "#15002B"]}
      style={[
        styles.signin,
        { flex: 1, paddingTop: (theme.SIZES?.BASE || 0) * 4 },
      ]}
    >
      <DismissKeyboardHOC>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            {true && (
              <Block style={{ paddingTop: "50%" }}>
                <Formik
                  initialValues={initForgotPasswordValues}
                  onSubmit={handleForgotPasswordSubmit({ navigation })}
                  validationSchema={Yup.object().shape({
                    email,
                  })}
                  enableReinitialize
                >
                  {({
                    handleChange,
                    values,
                    touched,
                    errors,
                    status,
                    isSubmitting,
                    submitForm,
                    resetForm,
                  }) => (
                    <Block flex>
                      <Block center>
                        <TextInput
                          autoFocus
                          style={[styles.inputPaper]}
                          textColor="white"
                          autoCapitalize="none"
                          label={
                            <Text style={styles.inputPaperLabel}>Email</Text>
                          }
                          underlineStyle={styles.inputPaperUnderlineStyle}
                          value={values.email}
                          onChangeText={handleChange("email")}
                        />
                        <HelperText
                          type="error"
                          visible={
                            touched.email &&
                            (status?.errors.email || errors.email)
                          }
                        >
                          {touched.email &&
                            (status?.errors.email || errors.email)}
                        </HelperText>
                      </Block>
                      <Block center flex style={{ marginTop: 20 }}>
                        <Button
                          size="large"
                          shadowless
                          color={materialTheme.COLORS.BUTTON_COLOR}
                          style={{ height: 48 }}
                          loading={isSubmitting}
                          onPress={() => {
                            submitForm();
                          }}
                        >
                          SEND LINK
                        </Button>

                        <Button
                          size="large"
                          color="transparent"
                          shadowless
                          onPress={() => {
                            resetForm();
                            navigation?.navigate("Sign Up");
                          }}
                        >
                          <Text
                            center
                            color={theme.COLORS?.WHITE}
                            size={(theme.SIZES?.FONT || 0) * 0.75}
                            style={{ marginTop: 20 }}
                          >
                            {"Don't have an account? Sign Up"}
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  )}
                </Formik>
              </Block>
            )}
          </KeyboardAvoidingView>
        </Block>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  inputPaper: {
    width: width * 0.9,
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});
