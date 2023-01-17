import { FormikValues } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { confirmMail, confirmPhone } from "../../api";
import { Navigation } from "../../types/navigation";
import { VerificationMode } from "./types";

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
    navigation,
  }: {
    verificationMode: VerificationMode;
    verificationCode: string;
    setVerificationCode: Dispatch<SetStateAction<string>>;
    setVerificationMode: Dispatch<SetStateAction<VerificationMode>>;
    setVerificationError: Dispatch<SetStateAction<string | null>>;
    setVerificationSubmitting: Dispatch<SetStateAction<boolean>>;
    navigation: Navigation;
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
      } else {
        const { message } = json;
        setVerificationError(message);
      }
    } else if (verificationMode === "phone") {
      const response = await confirmPhone(verificationCode);
      const json = await response.json();
      if ([200, 201].includes(response.status)) {
        console.log("json phone", json);
        setVerificationMode(null);
        setVerificationSubmitting(false);
        setVerificationCode("");
        navigation?.navigate("Home");
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
    console.log("submitted");
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
