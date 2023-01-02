import React, { useEffect, useState, useReducer, useContext } from "react";
import { Dimensions, Easing } from "react-native";
import { Header, Icon } from "../components";
import { Images, materialTheme } from "../constants";

import HomeScreen from "../screens/home";
import CreateDossierScreen from "../screens/dossiers/create";
import EditDossierScreen from "../screens/dossiers/edit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// screens

import SignInScreen from "../screens/signIn";
import SignUpScreen from "../screens/signUp";
import ForgotPasswordScreen from "../screens/forgotPassword";
import ResetPasswordScreen from "../screens/resetPassword";
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
import { AuthContext } from "../context/Auth";
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
  const [profile, setProfile] = useState();
  const { state } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} profile={state?.user} />
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
          <Drawer.Screen
            name="Forgot Password"
            component={ForgotPasswordScreen}
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
            name="Reset Password"
            component={ResetPasswordScreen}
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
                  back
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
                  back
                  search
                  options
                  title="Edit"
                  navigation={navigation}
                  scene={scene}
                />
              ),
            }}
          />
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
        </>
      )}
    </Drawer.Navigator>
  );
}
