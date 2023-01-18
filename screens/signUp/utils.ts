import { FormikValues } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { confirmMail, confirmPhone } from "../../api";
import { Navigation } from "../../types/navigation";
import { VerificationMode } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const initSignUpValues = {
//   phone: "+493482932441",
//   email: "zainіііi@gmail.com",
//   password: "pass1234",
//   passwordConfirm: "pass1234",
//   firstName: "muhammadu",
//   lastName: "zaini",
// };

export const initSignUpValues = {
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

export const handleVerification =
  ({
    verificationMode,
    verificationCode,
    setVerificationCode,
    setVerificationMode,
    setVerificationError,
    setVerificationSubmitting,
    setVerificationEmail,
    navigation,
    dispatch,
  }: {
    verificationMode: VerificationMode;
    verificationCode: string;
    setVerificationCode: Dispatch<SetStateAction<string>>;
    setVerificationMode: Dispatch<SetStateAction<VerificationMode>>;
    setVerificationError: Dispatch<SetStateAction<string | null>>;
    setVerificationSubmitting: Dispatch<SetStateAction<boolean>>;
    setVerificationEmail: Dispatch<SetStateAction<string>>;
    navigation: Navigation;
    dispatch: any;
  }) =>
  async (): Promise<void> => {
    if (!verificationCode) return;
    setVerificationSubmitting(true);
    if (verificationMode === "email") {
      const response = await confirmMail(verificationCode);
      const json = await response.json();
      if ([200, 201].includes(response.status)) {
        console.log("json email", json);
        setVerificationMode("phone");
        setVerificationSubmitting(false);
        setVerificationCode("");
        setVerificationEmail(
          "Your email is activated.Please verify your phone by code sent to ypur phone"
        );
      } else {
        const { message } = json;
        setVerificationError(message);
      }
    } else if (verificationMode === "phone") {
      const response = await confirmPhone(verificationCode);
      const json = await response.json();
      if ([200, 201].includes(response.status)) {
        setVerificationSubmitting(false);

        const { token, user } = json;
        try {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.log("Error when saving token to AsyncStorage");
        }
        //setProfile({ ...profile2, ...user });
        dispatch({
          type: "SIGN_IN",
          payload: {
            token,
            user,
          },
        });
        navigation?.navigate("Home");
        setVerificationMode(null);
        setVerificationCode("");
      } else {
        const { message } = json;
        setVerificationError(message);
      }
    }

    setVerificationSubmitting(false);
  };

export const handleSignUpSubmit = ({
  signUp,
  setVerificationMode,
  setVerificationEmail,
}: {
  signUp: (data: any, onSuccess: any, onError: any) => Promise<void>;
  setVerificationMode: Dispatch<SetStateAction<VerificationMode>>;
  setVerificationEmail: Dispatch<SetStateAction<string>>;
}) => {
  return async (
    values: any,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    await signUp(
      values,
      (message: string) => {
        setStatus({
          success: true,
          errors: {},
        });
        setSubmitting(false);
        setVerificationMode("email");
        setVerificationEmail(message);
      },
      (message: string) => {
        console.log("inside2");
        setStatus({
          success: false,
          errors: {
            passwordConfirm: message,
          },
        });
        setSubmitting(false);
      }
    );
  };
};
