import { FormikValues } from "formik";
import { signUp, signIn } from "../../api";

export const handleSignInSubmit = ({ navigation }: any) => {
  return async (
    values: any,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    console.log("values", values);

    signIn(values)
      .then((res) => {
        if ([200, 201].includes(res.status)) {
          setValues(initSignInValues);
          setTouched({});

          navigation.navigate("Home");
        } else {
          setSubmitting(false);
        }
        return res.json();
      })
      .then((data) => console.log("Resolved", data))
      .catch((err) => console.error("Rejected", err));
  };
};

const initSignInValues = {
  email: "zainіііi@gmail.com",
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
