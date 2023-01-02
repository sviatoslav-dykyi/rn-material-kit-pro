import { FormikValues } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { confirmMail } from "../../api";
import { Navigation } from "../../types/navigation";

export const initSignUpValues = {
  phone: "+493482932441",
  email: "zainіііi@gmail.com",
  password: "pass1234",
  passwordConfirm: "pass1234",
  firstName: "muhammadu",
  lastName: "zaini",
};

export const handleVerification =
  ({
    verificationCode,
    setVerificationMode,
    setVerificationError,
    setVerificationSubmitting,
    navigation,
  }: {
    verificationCode: string;
    setVerificationMode: Dispatch<SetStateAction<boolean>>;
    setVerificationError: Dispatch<SetStateAction<string | null>>;
    setVerificationSubmitting: Dispatch<SetStateAction<boolean>>;
    navigation: Navigation;
  }) =>
  async (): Promise<void> => {
    if (!verificationCode) return;
    setVerificationSubmitting(true);
    const response = await confirmMail(verificationCode);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      const {
        user: { email },
      } = json;
      setVerificationMode(false);
      setVerificationSubmitting(false);
      navigation?.navigate("Sign In", { email: email });
    } else {
      const { message } = json;
      setVerificationError(message);
    }
    setVerificationSubmitting(false);
  };

export const handleSignUpSubmit = ({
  signUp,
  setVerificationMode,
  setVerificationEmail,
}: {
  signUp: (data: any, onSuccess: any, onError: any) => Promise<void>;
  setVerificationMode: Dispatch<SetStateAction<boolean>>;
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
      (email: string) => {
        setStatus({
          success: true,
          errors: {},
        });
        setSubmitting(false);
        setVerificationMode(true);
        setVerificationEmail(email);
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
