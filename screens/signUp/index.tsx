import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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
import { AuthContext } from "../../navigation/context-utils";
import ConfirmationCodeField from "../../components/confirmationCodeField/ConfirmationCodeField";
import { Navigation } from "../../types/navigation";
import useOnFocus from "../../hooks/useOnFocus";

const { width } = Dimensions.get("window");
const SignUp = () => {
  const navigation = useNavigation<Navigation>();
  const [state, setState] = useState<any>({
    phone: "-",
    email: "-",
    password: "-",
    passwordConfirm: "-",
    firstName: "-",
    lastName: "-",
    active: {
      phone: false,
      email: false,
      password: false,
      passwordConfirm: false,
      firstName: false,
      lastName: false,
    },
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

  useOnFocus(() => setVerificationMode(false));

  const { signUp } = useContext(AuthContext);

  const toggleActive = (name: string) => {
    const { active } = state;
    active[name] = !active[name];
    setState({ active });
  };

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
                  handleBlur,
                  isSubmitting,
                  values,
                  submitForm,
                  touched,
                  status,
                  errors,
                }) => (
                  <Block
                    flex={1}
                    center
                    space="between"
                    style={{ paddingTop: "30%" }}
                  >
                    <Block center>
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        placeholder="First name"
                        autoCapitalize="none"
                        style={[
                          styles.input,
                          state.active.firstName ? styles.inputActive : null,
                        ]}
                        onBlur={() => {
                          toggleActive("firstName");
                          handleBlur("firstName");
                        }}
                        onFocus={() => toggleActive("firstName")}
                        onChangeText={handleChange("firstName")}
                        value={values.firstName}
                        bottomHelp
                        help={
                          touched.firstName &&
                          (status?.errors.firstName || errors.firstName)
                        }
                      />
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        placeholder="Last name"
                        autoCapitalize="none"
                        style={[
                          styles.input,
                          state.active.lastName ? styles.inputActive : null,
                        ]}
                        onBlur={() => {
                          toggleActive("lastName");
                          handleBlur("lastName");
                        }}
                        onFocus={() => toggleActive("lastName")}
                        onChangeText={handleChange("lastName")}
                        value={values.lastName}
                        bottomHelp
                        help={
                          touched.lastName &&
                          (status?.errors.lastName || errors.lastName)
                        }
                      />
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        type="phone-pad"
                        placeholder="Phone"
                        autoCapitalize="none"
                        style={[
                          styles.input,
                          state.active.phone ? styles.inputActive : null,
                        ]}
                        onBlur={() => {
                          toggleActive("phone");
                          handleBlur("phone");
                        }}
                        onFocus={() => toggleActive("phone")}
                        onChangeText={handleChange("phone")}
                        value={values.phone}
                        bottomHelp
                        help={
                          touched.phone &&
                          (status?.errors.phone || errors.phone)
                        }
                      />
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        type="email-address"
                        placeholder="Email"
                        autoCapitalize="none"
                        style={[
                          styles.input,
                          state.active.email ? styles.inputActive : null,
                        ]}
                        onBlur={() => {
                          toggleActive("email");
                          handleBlur("email");
                        }}
                        onFocus={() => toggleActive("email")}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        bottomHelp
                        help={
                          touched.email &&
                          (status?.errors.email || errors.email)
                        }
                      />
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        password
                        viewPass
                        placeholder="Password"
                        iconColor="white"
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
                          touched.password &&
                          (status?.errors.password || errors.password)
                        }
                      />
                      <Input
                        bgColor="transparent"
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        borderless
                        color="white"
                        password
                        viewPass
                        placeholder="Repeat Password"
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
                      />
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
                        onPress={() => navigation?.navigate("Sign In" as never)}
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
});
