import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { Block, Button, Input, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import {
  initSignUpValues,
  handleVerification,
  handleSignUpSubmit,
} from "./utils";
import { useNavigation } from "@react-navigation/native";
import ConfirmationCodeField from "../../components/confirmationCodeField/ConfirmationCodeField";
import { Navigation } from "../../types/navigation";
import useOnFocus from "../../hooks/useOnFocus";
import { AuthContext } from "../../context/Auth";
import { HelperText, TextInput } from "react-native-paper";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
const { width } = Dimensions.get("window");
const SignUp = () => {
  const navigation = useNavigation<Navigation>();
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    passwordConfirm: true,
  });

  const [verificationMode, setVerificationMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const { firstName, lastName, password, passwordConfirm, phone, email } =
    useValidation();

  useOnFocus(() => {
    setVerificationMode(false);
  });

  const { signUp } = useContext(AuthContext);

  return (
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
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            enabled
            keyboardVerticalOffset={0}
          >
            {!verificationMode ? (
              <>
                <Formik
                  initialValues={initSignUpValues}
                  onSubmit={handleSignUpSubmit({
                    signUp,
                    setVerificationMode,
                    setVerificationEmail,
                  })}
                  validationSchema={Yup.object().shape({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    passwordConfirm,
                  })}
                >
                  {({
                    handleChange,
                    isSubmitting,
                    values,
                    submitForm,
                    touched,
                    status,
                    errors,
                    resetForm,
                  }) => (
                    <Block
                      flex={1}
                      center
                      space="between"
                      style={{ paddingTop: "30%" }}
                    >
                      <Block center>
                        <TextInput
                          style={[styles.inputPaper]}
                          textColor="white"
                          autoCapitalize="none"
                          label={
                            <Text style={styles.inputPaperLabel}>
                              First name
                            </Text>
                          }
                          underlineStyle={styles.inputPaperUnderlineStyle}
                          value={values.firstName}
                          onChangeText={handleChange("firstName")}
                        />
                        <HelperText
                          type="error"
                          visible={
                            touched.firstName &&
                            (status?.errors.firstName || errors.firstName)
                          }
                        >
                          {touched.firstName &&
                            (status?.errors.firstName || errors.firstName)}
                        </HelperText>
                        <TextInput
                          style={[styles.inputPaper]}
                          textColor="white"
                          autoCapitalize="none"
                          label={
                            <Text style={styles.inputPaperLabel}>
                              Last name
                            </Text>
                          }
                          underlineStyle={styles.inputPaperUnderlineStyle}
                          value={values.lastName}
                          onChangeText={handleChange("lastName")}
                        />
                        <HelperText
                          type="error"
                          visible={
                            touched.lastName &&
                            (status?.errors.lastName || errors.lastName)
                          }
                        >
                          {touched.lastName &&
                            (status?.errors.lastName || errors.lastName)}
                        </HelperText>
                        <TextInput
                          keyboardType="phone-pad"
                          style={[styles.inputPaper]}
                          textColor="white"
                          autoCapitalize="none"
                          label={
                            <Text style={styles.inputPaperLabel}>Phone</Text>
                          }
                          underlineStyle={styles.inputPaperUnderlineStyle}
                          value={values.phone}
                          onChangeText={handleChange("phone")}
                        />
                        <HelperText
                          type="error"
                          visible={
                            touched.phone &&
                            (status?.errors.phone || errors.phone)
                          }
                        >
                          {touched.phone &&
                            (status?.errors.phone || errors.phone)}
                        </HelperText>
                        <TextInput
                          keyboardType="email-address"
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
                        <TextInput
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
                          loading={isSubmitting}
                        >
                          SIGN UP
                        </Button>
                        <Button
                          size="large"
                          color="transparent"
                          shadowless
                          onPress={() => {
                            resetForm();
                            navigation?.navigate("Sign In");
                          }}
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
                  )}
                </Formik>
              </>
            ) : (
              <ConfirmationCodeField
                value={verificationCode}
                setValue={setVerificationCode}
                error={verificationError}
                isSubmitting={verificationSubmitting}
                email={verificationEmail}
                onPress={handleVerification({
                  verificationCode,
                  setVerificationMode,
                  setVerificationError,
                  setVerificationSubmitting,
                  navigation,
                })}
              />
            )}
          </KeyboardAvoidingView>
        </Block>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signup: {
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
