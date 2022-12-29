import { FormikValues } from "formik";
import { forgotPassword } from "../../api";
import { Navigation } from "../../types/navigation";
import { ForgotPassword } from "../../types/auth";
import { Verification } from "../../types/common";

export const initForgotPasswordValues: ForgotPassword = {
  email: "",
};

export const initForgotPasswordTouched = {
  email: false,
};

export const handleForgotPasswordSubmit = ({
  navigation,
}: {
  navigation: Navigation;
}) => {
  return async (
    values: ForgotPassword,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    const response = await forgotPassword(values);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      setStatus({
        success: true,
        errors: {},
      });
      setSubmitting(false);
      setValues(initForgotPasswordValues);
      setTouched(initForgotPasswordTouched);
      navigation?.navigate("Reset Password");
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          email: message,
        },
      });
      setSubmitting(false);
    }
  };
};

export const initVerificationState: Verification = {
  show: false,
  error: null,
  isSubmitting: false,
  email: "",
};
