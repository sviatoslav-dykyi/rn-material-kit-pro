import { FormikValues } from "formik";
import { Alert } from "react-native";
import { signUp } from "../../api";

export const handleSignUpSubmit = ({ navigation }: any) => {
  return async (
    values: any,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    console.log("values", values);

    signUp(values)
      .then((res) => {
        if ([200, 201].includes(res.status)) {
          setValues(initSignUpValues);
          setTouched({});
          navigation.navigate("Home");
          //navigate(route("users"));
        } else {
          setSubmitting(false);
          // setStatus({
          //   success: false,
          //   errors: mapBackendValidationErrors(json.errors),
          // });
          setSubmitting(false);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data received", data);
      })
      .catch((err) => console.error("Rejected", err));
  };
};

export const initSignUpValues = {
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

// export const initSignUpValues = {
//   phone: "+493482932441",
//   email: "zainіііi@gmail.com",
//   password: "pass1234",
//   passwordConfirm: "pass1234",
//   firstName: "muhammadu",
//   lastName: "zaini",
// };
