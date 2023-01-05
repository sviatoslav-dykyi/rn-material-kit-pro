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
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Appbar, IconButton } from "react-native-paper";
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
import { dealTypes, dossierTypes } from "../dossiers/utils";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import useOnFocus from "../../hooks/useOnFocus";
import { deleteDossier } from "../../api/dossier";

const Home = () => {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useOnFocus(() => fetchDossiers({ setDossiers, setIsLoading }));

  const handleDelete = (_id: string) => async () => {
    const response = await deleteDossier(_id);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      fetchDossiers({ setDossiers, setIsLoading });
    }
  };

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
    <MenuProvider>
      <ScrollView>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    "ShowDossier" as never,
                    { id: _id } as never
                  );
                }}
                key={_id + " " + index}
              >
                {/* <Text>
                  {JSON.stringify(images)}==22=={images?.[0]?.url}
                </Text> */}

                <Block
                  card
                  space="between"
                  style={{
                    borderRadius: 10,
                    marginBottom: 20,
                    backgroundSize: "100%",
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
                        style={
                          {
                            //width: "80%",
                          }
                        }
                      ></Text>
                      <Menu>
                        <MenuTrigger
                          children={
                            <View
                              style={{
                                borderRadius: 7,
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 5,
                                paddingTop: 0,
                                paddingBottom: 10,
                                margin: 20,
                                marginTop: 17,
                                backgroundColor:
                                  materialTheme.COLORS.BUTTON_COLOR,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                              >
                                . . .
                              </Text>
                            </View>
                          }
                        />
                        <MenuOptions
                          customStyles={{
                            optionsContainer: {
                              marginTop: -90,
                            },
                          }}
                        >
                          <MenuOption
                            onSelect={() => {
                              navigation.navigate(
                                "EditDossier" as never,
                                { id: _id } as never
                              );
                            }}
                            text="Edit"
                          />
                          <MenuOption
                            onSelect={() => {
                              navigation.navigate(
                                "ShowDossier" as never,
                                { id: _id } as never
                              );
                            }}
                            text="View"
                          />
                          <MenuOption onSelect={handleDelete(_id!)}>
                            <Text style={{ color: "red" }}>Delete</Text>
                          </MenuOption>
                        </MenuOptions>
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
                          dealTypes.find((el) => el.value === (dealType || ""))
                            ?.label
                        }
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          paddingLeft: 10,
                          color: "#38454f",
                          flex: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {title}
                      </Text>
                    </Block>
                    <Block row style={{ alignItems: "center", paddingTop: 10 }}>
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
                        {address.street} {address.houseNumber}, {address.city}{" "}
                        {address.postCode}
                      </Text>
                    </Block>
                    <Block row style={{ alignItems: "center", paddingTop: 10 }}>
                      <Icon
                        name={
                          dossierTypes.find(
                            (el) => el.value === property.propertyType.code
                          )?.icon
                        }
                        color={materialTheme.COLORS.PLACEHOLDER}
                        family="MaterialIcons"
                        icon={
                          dossierTypes.find(
                            (el) => el.value === property.propertyType.code
                          )?.icon
                        }
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
                    <Block row style={{ alignItems: "center", paddingTop: 10 }}>
                      <Icon
                        name="calendar"
                        color={materialTheme.COLORS.PLACEHOLDER}
                        family="entypo"
                        iconSize={18}
                        size={20}
                      />
                      <Text style={{ fontSize: 15, paddingLeft: 6 }}>
                        Modified on {moment(updatedAt).format("DD.MM.yyyy")}
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </TouchableOpacity>
            )
          )}
        </Block>
      </ScrollView>
    </MenuProvider>
  );
};

export default Home;
