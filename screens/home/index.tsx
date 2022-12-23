import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Appbar, IconButton, Menu, Provider } from "react-native-paper";
import { Icon, Product } from "../../components";

const { width } = Dimensions.get("screen");
import homeImages from "../../constants/images/home";
import CreateDossier from "../dossiers/create";
import { useNavigation } from "@react-navigation/native";
import { Dossier } from "../dossiers/types";
import { fetchDossiers } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../dossiers/styles";
import { materialTheme } from "../../constants";

interface OpenMenu {
  [key: string]: boolean;
}

const Home = () => {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>({});
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
    fetchDossiers({ setDossiers, setIsLoading });
  }, []);

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator
          size="large"
          color={materialTheme.COLORS.BUTTON_COLOR}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <Provider>
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
          {dossiers.map(({ title, _id }) => (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("App" as never, {
                //   // @ts-ignore
                //   screen: "EditDossier",
                //   params: { id: _id } as never,
                // });
                //navigation.navigate("EditDossier" as never, { id: _id } as never);
              }}
              key={_id}
            >
              <Block
                card
                style={{
                  margin: 10,
                  justifyContent: "flex-start",
                  backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
                  height: 200,
                }}
              >
                <Block row space="between">
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#fff",
                      padding: 14,
                    }}
                  >
                    {title}
                  </Text>
                  <Menu
                    visible={Boolean(openMenu[_id!])}
                    contentStyle={{
                      marginTop: -40,
                    }}
                    onDismiss={() => {
                      setOpenMenu((state) => ({ ...state, [_id!]: false }));
                    }}
                    anchorPosition="top"
                    anchor={
                      <Button
                        onlyIcon
                        shadowColor={true}
                        icon="more-vert"
                        iconFamily="MaterialIcons"
                        iconSize={30}
                        onPress={() => {
                          setOpenMenu((state) => ({ ...state, [_id!]: true }));
                        }}
                        style={{ width: 40, height: 40 }}
                      ></Button>
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        navigation.navigate(
                          "EditDossier" as never,
                          { id: _id } as never
                        );
                        setOpenMenu((state) => ({ ...state, [_id!]: false }));
                      }}
                      title="Edit"
                    />
                    <Menu.Item title="View" />
                    <Menu.Item title="Delete" />
                  </Menu>
                </Block>
              </Block>
            </TouchableOpacity>
          ))}
        </Block>
      </Provider>
    </ScrollView>
  );
};

export default Home;
