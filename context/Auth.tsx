import React, { useEffect, useState, useReducer } from "react";
import { Images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp as signUpRequest, signIn as signInRequest } from "../api";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../utils/common";
import { ActionMap } from "../types/auth";
import { Navigation } from "../types/navigation";
import { User } from "../types/user";

const profile2 = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8,
};

interface AuthState {
  isSignout: boolean;
  userToken: null | string;
}

const authInitState: AuthState = {
  isSignout: false,
  userToken: null,
};

export type AuthContextType = {
  signIn: (data: any, onSuccess: any, onError: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: any, onSuccess: any, onError: any) => Promise<void>;
};

export const AuthContext = React.createContext<any>(null);

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const RESTORE_TOKEN = "RESTORE_TOKEN";

export type AuthActionTypes = {
  [SIGN_IN]: {
    token: string | null;
    user: User | null;
  };
  [SIGN_OUT]: undefined;
  [RESTORE_TOKEN]: {
    token: string | null;
  };
};

const AuthReducer = (
  prevState: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.payload.token,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.payload.token,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

type Props = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: Props) => {
  const navigation = useNavigation<Navigation>();
  const [state, dispatch] = useReducer(AuthReducer, authInitState);
  console.log("Gog");
  const [profile, setProfile] = useState();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getToken();
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      token &&
        dispatch({
          type: "RESTORE_TOKEN",
          payload: {
            token,
          },
        });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    console.log("Token changed", state.userToken);
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      state,
      signIn: async (data: any, onSuccess: any, onError: any) => {
        const response = await signInRequest(data);
        const json = await response.json();

        if ([200, 201].includes(response.status)) {
          const { token, user } = json;
          try {
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));
          } catch (e) {
            console.log("Error when saving token to AsyncStorage");
          }
          setProfile({ ...profile2, ...user });
          dispatch({
            type: "SIGN_IN",
            payload: {
              token,
              user,
            },
          });
          navigation?.navigate("Home");
        } else {
          const { message } = json;
          onError && onError(message);
        }
      },
      signOut: async () => {
        try {
          dispatch({ type: "SIGN_OUT" });
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
        } catch (e) {
          console.log("Error: ", e);
        }
      },
      signUp: async (data: any, onSuccess: any, onError: any) => {
        const response = await signUpRequest(data);
        const json = await response.json();
        if ([200, 201].includes(response.status)) {
          const {
            user: { email },
          } = json;
          onSuccess && onSuccess(email);
        } else {
          const { message } = json;
          onError && onError(message);
        }

        // !!!
        //dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
