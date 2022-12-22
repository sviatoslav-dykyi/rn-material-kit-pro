import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

import { Icon, Product } from "../../components";

const { width } = Dimensions.get("screen");
import homeImages from "../../constants/images/home";
import CreateDossier from "../dossiers/create";
import { useNavigation } from "@react-navigation/native";
import { Dossier } from "../dossiers/types";
import { fetchDossiers } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = () => {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  let token: any;
  let user;
  const getToken = async () => {
    try {
      token = await AsyncStorage.getItem("token");
      user = await AsyncStorage.getItem("user");
    } catch (e) {
      console.log("Error when reading token from AsyncStorage");
    }
    return token;
  };

  useEffect(() => {
    getToken();
    console.log(99999);
    fetchDossiers({ setDossiers });
  }, []);

  const navigation = useNavigation();
  return (
    <ScrollView>
      <Block row center>
        <Button
          onPress={() => {
            navigation.navigate("CreateDossier" as never);
          }}
        >
          Create
        </Button>
      </Block>
      <Block>
        {dossiers.map(({ title }, ind) => (
          <TouchableOpacity
            onPress={() => console.log(title)}
            style={{ margin: 10, backgroundColor: "#777" }}
            key={ind}
          >
            <Text>{title}</Text>
          </TouchableOpacity>
        ))}
        {dossiers.map(({ title, _id }, ind) => (
          <Button
            onPress={() => {
              navigation.navigate("App" as never, {
                // @ts-ignore
                screen: "EditDossier",
                params: { sdfsdf: "sdfdsfs", id: _id } as never,
              });
              // navigation.navigate(
              //   "EditDossier" as never,
              //   { sdfsdf: "sdfdsfs", id: _id } as never
              // );
            }}
            style={{ margin: 10, backgroundColor: "#777" }}
            key={ind}
          >
            <Text>{title}</Text>
          </Button>
        ))}
        {/* <Text>{JSON.stringify(dossiers)}</Text> */}
        <Text>{JSON.stringify(dossiers)}</Text>
      </Block>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS?.WHITE,
    shadowColor: theme.COLORS?.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS?.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS?.MUTED,
  },
  products: {
    width: width - Number(theme.SIZES?.BASE) * 2,
    paddingVertical: Number(theme.SIZES?.BASE) * 2,
  },
});
