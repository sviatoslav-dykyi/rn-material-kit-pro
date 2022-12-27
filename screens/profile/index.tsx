import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { fetchCurrentUser, handleUserUpdateSubmit } from "./utils";
import Form from "./Form";
import { styles } from "./styles";
import { User } from "../../types/user";
import useOnFocus from "../../hooks/useOnFocus";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
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

  const { firstName, lastName, passwordConfirm, phone, email } =
    useValidation();

  const toggleActive = (name: string) => {
    const { active } = state;

    active[name] = !active[name];

    setState({ active });
  };

  useOnFocus(() => fetchCurrentUser({ setUser, setIsLoading }));

  if (isLoading) {
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
          style={{ paddingTop: 50 }}
        >
          {user && (
            <Formik
              initialValues={user}
              onSubmit={handleUserUpdateSubmit({ navigation })}
              validationSchema={Yup.object().shape({
                firstName,
                lastName,
                email,
                phone,
                passwordConfirm,
              })}
            >
              {(props) => (
                <Form {...props} state={state} toggleActive={toggleActive} />
              )}
            </Formik>
          )}
        </KeyboardAvoidingView>
      </Block>
    </LinearGradient>
  );
};

export default Profile;
