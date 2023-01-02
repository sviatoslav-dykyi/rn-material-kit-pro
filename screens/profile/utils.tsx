import { FormikValues } from "formik";
import { getMe, updateUser } from "../../api";
import { User } from "../../types/user";

export const handleUserUpdateSubmit = ({ navigation }: any) => {
  return async (
    user: User,
    { setSubmitting, setTouched }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);

    const id = user.id;
    const rr = { firstName: "Adminn", id };
    console.log("rr", rr);
    const response = await updateUser(rr as any);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      console.log("json55", json);
      setTouched({});
      setSubmitting(false);
      return navigation.navigate("Home");
    }
    setSubmitting(false);
    console.log("Error when updating profile: ", json);
  };
};

export const fetchCurrentUser = async ({ setUser, setIsLoading }: any) => {
  setIsLoading(true);
  const response = await getMe();
  const json = await response.json();
  if ([200, 201].includes(response.status)) {
    const { user } = json;
    setUser(user);
  }
  setIsLoading(false);
};
