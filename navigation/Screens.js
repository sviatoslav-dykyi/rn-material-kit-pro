import React, { useEffect, useState, useReducer } from "react";
import { Dimensions, Easing } from "react-native";
import { Header, Icon } from "../components/";
import { Images, materialTheme } from "../constants/";

import HomeScreen from "../screens/Home";
import CreateDossierScreen from "../screens/dossiers/create";
import OnboardingScreen from "../screens/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
// screens

import SignInScreen from "../screens/signIn";
import SignUpScreen from "../screens/signUp";
import CustomDrawerContent from "./Menu";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { tabs } from "../constants/";
import { AuthContext } from "./context-utils";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
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
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        option={{
          headerTransparent: true,
        }}
      />
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
    </Stack.Navigator>
  );
}

function AppStack(props) {
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
  console.log("state in AppStack", state);
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const [userData, setUserData] = useState(null);
  const getData = async () => {
    try {
      value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("value22", value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    //console.log("11111");
    getData();
  });
  console.log("state", state);
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
        drawerContentOptions={{
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
            <Drawer.Screen
              name="Home"
              component={HomeStack}
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
        )}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
}
