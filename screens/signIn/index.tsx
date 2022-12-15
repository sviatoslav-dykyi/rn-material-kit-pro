import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";

import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { Formik } from "formik";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import { signIn } from "../../api";
import { handleSignInSubmit } from "./utils";
import { initSignUpValues } from "../signUp/utils";

const { width } = Dimensions.get("window");

const SignIn = (props) => {
  const [state, setState] = useState<any>({
    email: "-",
    password: "-",
    active: {
      email: false,
      password: false,
    },
  });

  const { email, password } = useValidation();

  const toggleActive = (name) => {
    const { active } = state;
    active[name] = !active[name];

    setState({ active });
  };

  const { navigation } = props;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#6C24AA", "#15002B"]}
      style={[styles.signin, { flex: 1, paddingTop: theme.SIZES.BASE * 4 }]}
    >
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Block middle>
            <Block
              row
              center
              space="between"
              style={{ marginVertical: theme.SIZES.BASE * 1.875 }}
            >
              <Block flex middle right>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="facebook"
                  iconFamily="font-awesome"
                  color={theme.COLORS.FACEBOOK}
                  shadowless
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
              <Block flex middle center>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="twitter"
                  iconFamily="font-awesome"
                  color={theme.COLORS.TWITTER}
                  shadowless
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
              <Block flex middle left>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="dribbble"
                  iconFamily="font-awesome"
                  color={theme.COLORS.DRIBBBLE}
                  shadowless
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
            </Block>
          </Block>
          <Block middle style={{ paddingVertical: theme.SIZES.BASE * 2.625 }}>
            <Text center color="white" size={14}>
              or be classical
            </Text>
          </Block>
          <Formik
            initialValues={initSignUpValues}
            onSubmit={handleSignInSubmit({ navigation })}
            validationSchema={Yup.object().shape({
              email,
              password,
            })}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              submitForm,
              touched,
              errors,
              status,
            }) => (
              <Block flex>
                <Block center>
                  <Block style={{ width: 200, height: 200 }}></Block>
                  <Input
                    borderless
                    autoFocus
                    color="white"
                    placeholder="Email"
                    //type="email-address"
                    autoCapitalize="none"
                    bgColor="transparent"
                    placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
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
                      touched.email ? status?.errors.email || errors.email : ""
                    }
                  />
                  <Input
                    password
                    viewPass
                    borderless
                    color="white"
                    iconColor="white"
                    placeholder="Password"
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
                  <Text
                    color={theme.COLORS.WHITE}
                    size={theme.SIZES.FONT * 0.75}
                    onPress={() => Alert.alert("Not implemented")}
                    style={{
                      alignSelf: "flex-end",
                      lineHeight: theme.SIZES.FONT * 2,
                    }}
                  >
                    Forgot your password?
                  </Text>
                </Block>
                <Block center flex style={{ marginTop: 20 }}>
                  <Button
                    size="large"
                    shadowless
                    color={materialTheme.COLORS.BUTTON_COLOR}
                    style={{ height: 48 }}
                    onPress={
                      () => {
                        submitForm();
                      }

                      // Alert.alert(
                      //   "Sign in action",
                      //   `Email: ${email} Password: ${password}`
                      // )
                    }
                  >
                    SIGN IN
                  </Button>
                  <Button
                    size="large"
                    color="transparent"
                    shadowless
                    onPress={() => navigation.navigate("Sign Up")}
                  >
                    <Text
                      center
                      color={theme.COLORS.WHITE}
                      size={theme.SIZES.FONT * 0.75}
                      style={{ marginTop: 20 }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Text>
                  </Button>
                </Block>
              </Block>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
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
