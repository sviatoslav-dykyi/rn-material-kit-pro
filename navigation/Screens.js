import React, { useEffect, useState, useReducer } from "react";
import { Dimensions, Easing } from "react-native";
import { Header, Icon } from "../components";
import { Images, materialTheme } from "../constants";

import HomeScreen from "../screens/home";
import CreateDossierScreen from "../screens/dossiers/create";
import EditDossierScreen from "../screens/dossiers/edit";
import OnboardingScreen from "../screens/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
// screens

import SignInScreen from "../screens/signIn";
import SignUpScreen from "../screens/signUp";
import SignOutScreen from "../screens/signOut";
import ProfileScreen from "../screens/profile";
import ShowScreen from "../screens/dossiers/show";
import CustomDrawerContent from "./Menu";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { tabs } from "../constants";
import { AuthContext } from "./context-utils";
import { signUp as signUpRequest, signIn as signInRequest } from "../api";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../utils/common";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile2 = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8,
};

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}

function WomanStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

function ManStack(props) {
  return <Stack.Navigator mode="card" headerMode="screen"></Stack.Navigator>;
}

function KidsStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

function NewCollectionStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    ></Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Home2"
        headerShown={false}
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Home3"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function CreateDossierStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="CreateDossier2"
        headerShown={false}
        component={CreateDossierScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Create"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function EditDossierStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="EditDossier2"
        headerShown={false}
        component={EditDossierScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              options
              title="Edit"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  console.log("Gog");
  const [profile, setProfile] = useState();

  useEffect(() => {
    console.log("hallo !!!!!");
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      const token = await getToken();
      console.log("my-token", token);
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    console.log("Token changed", state.userToken);
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data, setSubmitting) => {
        setSubmitting(true);
        // const { token, user } = data;
        // console.log("token", token);
        // // In a production app, we need to send some data (usually username, password) to server and get a token
        // // We will also need to handle errors if sign in failed
        // // After getting token, we need to persist the token using `SecureStore`
        // // In the example, we'll use a dummy token
        // console.log("new token", token);
        // try {
        //   await AsyncStorage.setItem("token", token);
        // } catch (e) {
        //   console.log("Error when saving token to AsyncStorage");
        // }
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
          console.log("user", user);
          //setSubmitting(false);
          dispatch({ type: "SIGN_IN", token });
          navigation.navigate("Home");
        }
        setSubmitting(false);
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
      signUp: async (data, onSuccess, onError) => {
        const response = await signUpRequest(data);
        const json = await response.json();
        if ([200, 201].includes(response.status)) {
          const {
            user: { email },
          } = json;
          onSuccess(email);
          // const { token, user } = json;
          // try {
          //   await AsyncStorage.setItem("token", token);
          //   await AsyncStorage.setItem("user", JSON.stringify(user));
          // } catch (e) {
          //   console.log("Error when saving token to AsyncStorage");
          // }
          // setProfile({ ...profile2, ...user });
          // dispatch({ type: "SIGN_IN", token });
          // navigation.navigate("Home");
        } else {
          console.log("json", json);
          onError();
        }

        // !!!

        //dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props} profile={profile} />
        )}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8,
        }}
        screenOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: materialTheme.COLORS.ACTIVE,
          inactiveBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.74,
            paddingHorizontal: 12,
            // paddingVertical: 4,
            justifyContent: "center",
            alignContent: "center",
            // alignItems: 'center',
            overflow: "hidden",
          },
          labelStyle: {
            fontSize: 18,
            fontWeight: "normal",
          },
        }}
        initialRouteName="Home"
      >
        {/* {state.userToken == null ? (
          <>
            <Drawer.Screen
              name="CreateDossier"
              component={CreateDossierStack}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="shop"
                    family="GalioExtra"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="CreateDossier"
              component={CreateDossierStack}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="shop"
                    family="GalioExtra"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            />
          </>
        )} */}
        {state.userToken == null ? (
          <>
            <Drawer.Screen
              name="Sign In"
              component={SignInScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="ios-log-in"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Sign Up"
              component={SignUpScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="md-person-add"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              headerShown={false}
              component={HomeScreen}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    search
                    options
                    title="Home"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="CreateDossier"
              headerShown={false}
              component={CreateDossierScreen}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    search
                    options
                    title="Create"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="EditDossier"
              headerShown={false}
              component={EditDossierScreen}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    search
                    options
                    title="Edit"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
              }}
            />
            {/* <Drawer.Screen
              name="Sign In"
              component={SignInScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="ios-log-in"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            /> */}
            {/* <Drawer.Screen
              name="Sign Up"
              component={SignUpScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="md-person-add"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            /> */}
            <Drawer.Screen
              name="Logout"
              component={SignOutScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="md-person-add"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    search
                    options
                    title="Profile"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="ShowDossier"
              headerShown={false}
              component={ShowScreen}
              options={{
                header: ({ navigation, scene }) => (
                  <Header
                    search
                    options
                    title="Show"
                    navigation={navigation}
                    scene={scene}
                  />
                ),
              }}
            />
            {/* <Drawer.Screen
              name="ShowDossier"
              component={ShowScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused }) => (
                  <Icon
                    size={16}
                    name="md-person-add"
                    family="ionicon"
                    color={focused ? "white" : materialTheme.COLORS.MUTED}
                  />
                ),
              }}
            /> */}
          </>
        )}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
}
