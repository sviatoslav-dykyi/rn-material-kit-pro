import { FormikValues } from "formik";
import { signUp, signIn } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../navigation/context-utils";
import { useContext } from "react";

export const handleSignInSubmit = ({ navigation, signInContext }: any) => {
  return async (
    values: any,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    const response = await signIn(values);
    const json = await response.json();
    console.log("json", json);
    if ([200, 201].includes(response.status)) {
      signInContext(json);
      setValues(initSignInValues);
      setTouched({});
      navigation.navigate("Home");
    }
    // signIn(values)
    //   .then((res) => {
    //     if ([200, 201].includes(res.status)) {
    //       setValues(initSignInValues);
    //       setTouched({});

    //       navigation.navigate("Home");
    //     } else {
    //       setSubmitting(false);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((err) => console.error("Rejected", err));
  };
};

export const storeUserData = async (data: any) => {
  try {
    //console.log("zz");
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("user", jsonValue);
    //console.log(await AsyncStorage.getItem("user"));
  } catch (e) {
    // saving error
  }
};

export const initSignInValues = {
  email: "zain@gmail.com",
  password: "pass1234",
};

// const initSignInValues = {
//   email: "",
//   password: "",
// };

const touchedInitState = {
  email: false,
  password: false,
};
