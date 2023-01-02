import React, { ReactElement, useContext, useState } from "react";
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
import ConfirmationCodeField from "../../components/confirmationCodeField/ConfirmationCodeField";
import { initVerificationState } from "../forgotPassword/utils";
import { handleResetPasswordSubmit, initResetPasswordValues } from "./utils";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

const ResetPassword = (): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    passwordConfirm: true,
  });

  const [verification, setVerification] = useState(initVerificationState);
  const [code, setCode] = useState("");
  const { password, passwordConfirm } = useValidation();

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
          <KeyboardAvoidingView enabled>
            <Block
              style={{
                paddingTop: "50%",
              }}
            >
              <Formik
                initialValues={initResetPasswordValues}
                onSubmit={handleResetPasswordSubmit({ code, navigation })}
                validationSchema={Yup.object().shape({
                  password,
                  passwordConfirm,
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
                }) => (
                  <Block center>
                    {/* <Input
                      autoFocus
                      password
                      viewPass
                      borderless
                      color="white"
                      iconColor="white"
                      placeholder="New password"
                      bgColor="transparent"
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      style={[
                        styles.input,
                        state.active.password ? styles.inputActive : null,
                      ]}
                      onBlur={() => {
                        toggleActive("password");
                        handleBlur("password");
                      }}
                      onFocus={() => toggleActive("password")}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      bottomHelp
                      help={
                        touched.password
                          ? status?.errors.password || errors.password
                          : ""
                      }
                    />

                    <Input
                      bgColor="transparent"
                      placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                      borderless
                      color="white"
                      password
                      viewPass
                      placeholder="Repeat new password"
                      iconColor="white"
                      style={[
                        styles.input,
                        state.active.passwordConfirm
                          ? styles.inputActive
                          : null,
                      ]}
                      onBlur={() => {
                        toggleActive("passwordConfirm");
                        handleBlur("passwordConfirm");
                      }}
                      onFocus={() => toggleActive("passwordConfirm")}
                      onChangeText={handleChange("passwordConfirm")}
                      value={values.passwordConfirm}
                      bottomHelp
                      help={
                        touched.passwordConfirm &&
                        (status?.errors.passwordConfirm ||
                          errors.passwordConfirm)
                      }
                    /> */}
                    <TextInput
                      autoFocus
                      secureTextEntry={secureTextEntry.password}
                      style={[styles.inputPaper]}
                      textColor="white"
                      autoCapitalize="none"
                      label={
                        <Text style={styles.inputPaperLabel}>Password</Text>
                      }
                      underlineStyle={styles.inputPaperUnderlineStyle}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      right={
                        <TextInput.Icon
                          icon="eye"
                          color={() => "white"}
                          onPress={() => {
                            setSecureTextEntry((prevState) => ({
                              ...prevState,
                              password: !prevState.password,
                            }));
                          }}
                        />
                      }
                    />
                    <HelperText
                      type="error"
                      visible={
                        touched.password &&
                        (status?.errors.password || errors.password)
                      }
                    >
                      {touched.password &&
                        (status?.errors.password || errors.password)}
                    </HelperText>
                    <TextInput
                      secureTextEntry={secureTextEntry.passwordConfirm}
                      style={[styles.inputPaper]}
                      textColor="white"
                      autoCapitalize="none"
                      label={
                        <Text style={styles.inputPaperLabel}>
                          Repeat Password
                        </Text>
                      }
                      underlineStyle={styles.inputPaperUnderlineStyle}
                      value={values.passwordConfirm}
                      onChangeText={handleChange("passwordConfirm")}
                      right={
                        <TextInput.Icon
                          icon="eye"
                          color={() => "white"}
                          onPress={() => {
                            setSecureTextEntry((prevState) => ({
                              ...prevState,
                              passwordConfirm: !prevState.passwordConfirm,
                            }));
                          }}
                        />
                      }
                    />
                    <HelperText
                      type="error"
                      visible={
                        touched.passwordConfirm &&
                        (status?.errors.passwordConfirm ||
                          errors.passwordConfirm)
                      }
                    >
                      {touched.passwordConfirm &&
                        (status?.errors.passwordConfirm ||
                          errors.passwordConfirm)}
                    </HelperText>
                    <Block>
                      <ConfirmationCodeField
                        value={code}
                        setValue={setCode}
                        error={verification.error}
                        isSubmitting={isSubmitting}
                        email={verification.email}
                        confirmButtonTitle="RESET PASSWORD"
                        onPress={() => {
                          console.log("111");
                          submitForm();
                        }}
                        title={" "}
                      />
                    </Block>
                  </Block>
                )}
              </Formik>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

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

export default ResetPassword;
