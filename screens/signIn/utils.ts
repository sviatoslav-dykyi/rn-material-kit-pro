import { FormikValues } from "formik";

export const initSignInValues = {
  email: "vkcxdpljxuuaemigdw@tmmcv.com",
  password: "pass1234",
};

// export const initSignInValues = {
//   email: "",
//   password: "",
// };

export const handleSignInSubmit = ({
  signIn,
}: {
  signIn: (data: any, onSuccess: any, onError: any) => Promise<void>;
}) => {
  return async (
    values: any,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    await signIn(
      values,
      () => {
        setStatus({
          success: true,
          errors: {},
        });
        setSubmitting(false);
      },
      (message: string) => {
        setStatus({
          success: false,
          errors: {
            password: message,
          },
        });
        setSubmitting(false);
      }
    );
  };
};
