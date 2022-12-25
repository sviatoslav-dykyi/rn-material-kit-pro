import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Appbar, IconButton, Menu, Provider } from "react-native-paper";
import { Icon, Product } from "../../components";
import capitalize from "lodash/capitalize";
const { width } = Dimensions.get("screen");
import homeImages from "../../constants/images/home";
import CreateDossier from "../dossiers/create";
import { useNavigation } from "@react-navigation/native";
import { Dossier } from "../dossiers/types";
import { fetchDossiers } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../dossiers/styles";
import { materialTheme } from "../../constants";
import { deleteDossier } from "../../api";
import { dealTypes, dossierTypes } from "../dossiers/utils";
import moment from "moment";
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

  const handleDelete = (_id: string) => async () => {
    const response = await deleteDossier(_id);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      fetchDossiers({ setDossiers, setIsLoading });
    }
  };
  console.log("openMenu", openMenu);
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
          <Block
            left
            style={[
              styles.imageBackground,
              { paddingTop: 10, paddingBottom: 10 },
            ]}
          >
            <Button
              onPress={() => {
                navigation.navigate("CreateDossier" as never);
              }}
              style={{ margin: 0 }}
            >
              Create
            </Button>
          </Block>
        </Block>
        <Block center style={styles.imageBackground}>
          {dossiers.map(
            (
              {
                title,
                _id,
                images,
                property,
                dealType,
                updatedAt,
                property: {
                  location: { address },
                },
              },
              index
            ) => (
              <>
                {true && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(
                        "ShowDossier" as never,
                        { id: _id } as never
                      );
                    }}
                    key={index}
                  >
                    <Block
                      card
                      space="between"
                      style={{
                        borderRadius: 10,
                        //overflow: "hidden",
                        marginBottom: 20,
                        backgroundSize: "100%",
                        // borderWidth: 2,
                        // borderColor: "red",
                        backgroundColor: "#fff",
                      }}
                    >
                      <ImageBackground
                        source={{ uri: images?.[0]?.url }}
                        resizeMode="cover"
                        style={[
                          styles.imageBackground,
                          {
                            justifyContent: "flex-start",
                          },
                        ]}
                      >
                        <Block
                          row
                          space="between"
                          style={{
                            height: 150,

                            backgroundColor: !images?.[0]?.url ? "#fff" : null,
                          }}
                        >
                          <Text
                            style={{
                              width: "80%",
                            }}
                          ></Text>
                          <Menu
                            visible={Boolean(openMenu[_id!])}
                            contentStyle={{
                              borderColor: "red",
                              borderWidth: 2,
                            }}
                            onDismiss={() => {
                              setOpenMenu((state) => ({
                                ...state,
                                [_id!]: false,
                              }));
                            }}
                            anchor={
                              <Button
                                onlyIcon
                                shadowColor={true}
                                icon="more-horiz"
                                iconFamily="MaterialIcons"
                                iconSize={30}
                                onPress={() => {
                                  setOpenMenu((state) => ({
                                    ...state,
                                    [_id!]: true,
                                  }));
                                }}
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                              ></Button>
                            }
                          >
                            <Menu.Item
                              onPress={() => {
                                navigation.navigate(
                                  "EditDossier" as never,
                                  { id: _id } as never
                                );
                                setOpenMenu((state) => ({
                                  ...state,
                                  [_id!]: false,
                                }));
                              }}
                              title="Edit"
                            />
                            <Menu.Item
                              title="View"
                              onPress={() => {
                                navigation.navigate(
                                  "ShowDossier" as never,
                                  { id: _id } as never
                                );
                                setOpenMenu((state) => ({
                                  ...state,
                                  [_id!]: false,
                                }));
                              }}
                            />
                            <Menu.Item
                              title="Delete"
                              onPress={handleDelete(_id!)}
                            />
                          </Menu>
                        </Block>
                      </ImageBackground>
                      <Block style={{ padding: 15 }}>
                        <Block row style={{ alignItems: "center" }}>
                          <Text
                            size={12}
                            style={{
                              padding: 5,
                              backgroundColor: "#e4effb",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              color: "#1871bf",
                            }}
                          >
                            {
                              dealTypes.find(
                                (el) => el.value === (dealType || "")
                              )?.label
                            }
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 15,
                              paddingLeft: 10,
                              color: "#38454f",
                              width: "80%",
                            }}
                          >
                            {title}
                          </Text>
                        </Block>
                        <Block
                          row
                          style={{ alignItems: "center", paddingTop: 10 }}
                        >
                          <Icon
                            name="location-on"
                            color={materialTheme.COLORS.PLACEHOLDER}
                            family="MaterialIcons"
                            icon="location-on"
                            iconSize={18}
                            size={20}
                            style={[]}
                          />
                          <Text style={{ fontSize: 15, paddingLeft: 6 }}>
                            {address.street} {address.houseNumber},{" "}
                            {address.city} {address.postCode}
                          </Text>
                        </Block>
                        <Block
                          row
                          style={{ alignItems: "center", paddingTop: 10 }}
                        >
                          <Icon
                            name="location-on"
                            color={materialTheme.COLORS.PLACEHOLDER}
                            family="MaterialIcons"
                            icon="location-on"
                            iconSize={18}
                            size={20}
                            style={[]}
                          />
                          <Text style={{ fontSize: 15, paddingLeft: 6 }}>
                            {
                              dossierTypes.find(
                                (el) => el.value === property.propertyType.code
                              )?.label
                            }
                          </Text>
                        </Block>
                        <Block
                          row
                          style={{ alignItems: "center", paddingTop: 10 }}
                        >
                          <Icon
                            name="location-on"
                            color={materialTheme.COLORS.PLACEHOLDER}
                            family="MaterialIcons"
                            icon="location-on"
                            iconSize={18}
                            size={20}
                            style={[]}
                          />
                          <Text style={{ fontSize: 15, paddingLeft: 6 }}>
                            Modified on {moment(updatedAt).format("DD.MM.yyyy")}
                          </Text>
                        </Block>

                        {/* <Text>{title}</Text> */}
                      </Block>
                    </Block>
                  </TouchableOpacity>
                )}
              </>
            )
          )}
        </Block>
      </Provider>
    </ScrollView>
  );
};

export default Home;
