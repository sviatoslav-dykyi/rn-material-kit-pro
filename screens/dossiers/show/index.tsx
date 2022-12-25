import React, { useState, ReactElement, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Form from "../form";
import { styles } from "../styles";
import { Dossier } from "../types";

import { materialTheme } from "../../../constants";
import { GOOGLE_API_KEY, prepareDossierBeforeForm } from "../form/utils";
import { fetchDossier } from "../edit/utils";
import { dossierTypes, energyLabels } from "../utils";
import { Icon } from "../../../components";
import { DossierTypes } from "../../../utils/constants";
import Rating from "../form/Rating";

const ShowDossier = (): ReactElement => {
  const route = useRoute<any>();
  //console.log("route1", route);
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoaing, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDossier({ setDossier, setIsLoading, id });
  }, [id]);

  if (isLoaing) {
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
      <Block flex middle>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          enabled
          keyboardVerticalOffset={0}
        >
          {dossier && (
            <Block style={styles.imageBackground}>
              {dossier.images.length > 0 && (
                <Image
                  source={{ uri: dossier.images[0].url }}
                  style={[styles.showImage]}
                />
              )}
              <Text style={styles.showSubtitle}>
                {
                  dossierTypes.find(
                    (el) => el.value === dossier.property.propertyType.code
                  )?.label
                }{" "}
                details
              </Text>
              <Block>
                <Block row style={styles.showFieldInfoBlock}>
                  <Icon
                    name={
                      dossierTypes.find(
                        (el) => el.value === dossier.property.propertyType.code
                      )?.icon
                    }
                    color={materialTheme.COLORS.PLACEHOLDER}
                    family="MaterialIcons"
                    iconSize={18}
                    size={22}
                    style={[]}
                  />

                  <Text style={styles.showFieldInfoText}>
                    {
                      dossierTypes.find(
                        (el) => el.value === dossier.property.propertyType.code
                      )?.label
                    }
                  </Text>
                </Block>
                {dossier.property.floorNumber && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="stairs"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Floor number: {dossier.property.floorNumber}
                    </Text>
                  </Block>
                )}
                {dossier.property.livingArea && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="roofing"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Net living area: {dossier.property.livingArea} m²
                    </Text>
                  </Block>
                )}
                <Block row style={styles.showFieldInfoBlock}>
                  <Icon
                    name="build"
                    color={materialTheme.COLORS.PLACEHOLDER}
                    family="MaterialIcons"
                    iconSize={18}
                    size={22}
                    style={[]}
                  />

                  <Text style={styles.showFieldInfoText}>
                    Building year: {dossier.property.buildingYear}
                  </Text>
                </Block>
                {dossier.property.numberOfRooms && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="meeting-room"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      {dossier.property.numberOfRooms} rooms
                    </Text>
                  </Block>
                )}
                {dossier.property.numberOfFloorsInBuilding && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="escalator"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Number of floors:{" "}
                      {dossier.property.numberOfFloorsInBuilding}
                    </Text>
                  </Block>
                )}
                {dossier.property.energyLabel && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="battery-charging-full"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Energy label:{" "}
                      {
                        energyLabels.find(
                          (el) => el.value === dossier.property.energyLabel
                        )?.label
                      }
                    </Text>
                  </Block>
                )}
                {dossier.property.renovationYear && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="handyman"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Renovation year: {dossier.property.renovationYear}
                    </Text>
                  </Block>
                )}
                {dossier.property.numberOfBathrooms && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="bathtub"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Bathrooms: {dossier.property.numberOfBathrooms}
                    </Text>
                  </Block>
                )}
                {dossier.property.hasLift && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="unfold-more"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>Lift</Text>
                  </Block>
                )}
                {dossier.property.hasSauna && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="add-circle"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>Sauna</Text>
                  </Block>
                )}
                {dossier.property.hasPool && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="pool"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>Pool</Text>
                  </Block>
                )}
                {dossier.property.isNew && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="add-business"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>New building</Text>
                  </Block>
                )}
                {dossier.property.balconyArea && (
                  <Block row style={styles.showFieldInfoBlock}>
                    <Icon
                      name="deck"
                      color={materialTheme.COLORS.PLACEHOLDER}
                      family="MaterialIcons"
                      iconSize={18}
                      size={22}
                      style={[]}
                    />

                    <Text style={styles.showFieldInfoText}>
                      Balcony / Terrace: {dossier.property.balconyArea} m²
                    </Text>
                  </Block>
                )}
              </Block>
              <Text style={[styles.showSubtitle]}>Quality and Condition</Text>
              <Block>
                <Rating
                  values={dossier}
                  handleQualityRate={() => {}}
                  handleConditionRate={() => {}}
                  type={dossier.property.propertyType.code}
                />
              </Block>
            </Block>
          )}
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
  );
};

export default ShowDossier;
