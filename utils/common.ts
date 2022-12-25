import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

export const mapBackendValidationErrors = (
  errors: Record<string, Array<string>>
): Record<string, string> => {
  const mappedErrors = {} as Record<string, string>;
  for (const [key, value] of Object.entries(errors))
    mappedErrors[key] = value[0];
  return mappedErrors;
};

export const getToken = async (): Promise<string | null | undefined> => {
  let token;
  try {
    token = await AsyncStorage.getItem("token");
  } catch (e) {
    console.log("Error when reading token from AsyncStorage");
  }
  return token;
};

export const setAuthStorageData = async ({
  token,
  user,
}: {
  token: string;
  user: User;
}): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch (e) {
    console.log("Error when saving token to AsyncStorage", e);
    return false;
  }
};
