import React, { useContext } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ListView,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem } from "../components";
import { Images, materialTheme } from "../constants";
import { AuthContext } from "./context-utils";

const { width } = Dimensions.get("screen");

const profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8,
};

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}: any) {
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Woman",
    "Man",
    "Kids",
    "New Collection",
    "Profile",
    "Settings",
    "Components",
  ];

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.23} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Block style={styles.profile}>
            <Block row space="between">
              <Image source={{ uri: profile?.avatar }} style={styles.avatar} />
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text style={{ fontStyle: "italic", color: "#000000b2" }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </Block>
            <Text h5 color={"white"}>
              {profile?.firstName} {profile?.lastName}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block row>
          <Block middle style={styles.pro}>
            <Text size={12} color="white">
              {profile?.isActivated ? "Activated" : "Not activated"}
            </Text>
          </Block>
          <Text size={12} muted style={styles.seller}>
            {profile?.role}
          </Text>
        </Block>
      </Block>

      <Block
        flex={0.25}
        style={{ paddingLeft: 7, paddingRight: 14, paddingTop: 60 }}
      >
        {/* <DrawerCustomItem
          title="Sign In"
          navigation={navigation}
          focused={state.index === 8 ? true : false}
        />
        <DrawerCustomItem
          title="Sign Up"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        /> */}
        <DrawerCustomItem
          title="Profile"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        />
        <DrawerCustomItem
          title="Home"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        />
        <DrawerCustomItem
          title="Logout"
          navigation={navigation}
          focused={state.index === 9 ? true : false}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4B1958",
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES?.BASE,
    paddingTop: Number(theme.SIZES?.BASE) * 2,
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end",
  },
  profile: {
    marginBottom: Number(theme.SIZES?.BASE) / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: Number(theme.SIZES?.BASE),
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    //width: 38,
  },
  seller: {
    marginRight: 16,
  },
});

export default CustomDrawerContent;
