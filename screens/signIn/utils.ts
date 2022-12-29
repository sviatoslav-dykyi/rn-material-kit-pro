import { FormikValues } from "formik";
import { signUp, signIn } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../navigation/context-utils";
import { useContext } from "react";

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
  email: "admin@gmail.com",
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
