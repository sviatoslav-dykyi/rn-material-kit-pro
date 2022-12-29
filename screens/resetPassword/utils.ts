import { FormikValues } from "formik";
import { resetPassword } from "../../api";
import { ResetPassword } from "../../types/auth";
import { Navigation } from "../../types/navigation";

export const initResetPasswordValues: ResetPassword = {
  password: "",
  passwordConfirm: "",
};

export const handleResetPasswordSubmit = ({
  code,
  navigation,
}: {
  code: string;
  navigation: Navigation;
}) => {
  return async (
    values: ResetPassword,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    const response = await resetPassword(code, values);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      const {
        user: { email },
      } = json;
      setStatus({
        success: true,
        errors: {},
      });
      setSubmitting(false);
      navigation?.navigate("Sign In", { email });
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          passwordConfirm: message,
        },
      });
      setSubmitting(false);
    }
  };
};
