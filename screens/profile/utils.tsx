import { FormikValues } from "formik";
import { getMe, updateUser } from "../../api";
import { User } from "../../types/user";

export const handleUserUpdateSubmit = ({ navigation }: any) => {
  return async (
    user: User,
    { setSubmitting, setTouched }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    const response = await updateUser(user);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
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
