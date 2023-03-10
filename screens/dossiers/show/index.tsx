import React, { useState, ReactElement, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Block } from "galio-framework";
import { Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "../styles";
import { Dossier } from "../types";
import { materialTheme } from "../../../constants";
import { fetchDossier } from "../edit/utils";
import { Icon } from "../../../components";
import { showPageTabs } from "./utils";
import { ShowPageTabs } from "./types";
import Overview from "./Overview";
import SocioEconomics from "./SocioEconomics";
import useIsFocusedCustom from "../../../hooks/useOnFocus";

const ShowDossier = (): ReactElement => {
  const route = useRoute<any>();
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<ShowPageTabs>("overview");

  useEffect(() => {
    fetchDossier({ setDossier, setIsLoading, id });
  }, [id]);

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
      <Block>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          enabled
          keyboardVerticalOffset={0}
        >
          {dossier && (
            <Block flex middle>
              {dossier.images.length > 0 && (
                <Image
                  source={{ uri: dossier.images[0].url }}
                  style={[styles.showImage]}
                />
              )}
              <Block row right style={styles.showTabBlock}>
                {showPageTabs.map(({ value, label, icon }) => (
                  <TouchableOpacity
                    key={value}
                    disabled={tab === value}
                    style={[
                      styles.showTab,
                      tab === value ? styles.showTabHighlighted : {},
                    ]}
                    onPress={() => {
                      setTab(value);
                    }}
                  >
                    <Icon size={35} family="entypo" name={icon} color="#fff" />
                    <Text style={styles.showTabText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </Block>
              <Block style={styles.showTabsBlock}>
                {tab === "overview" && <Overview dossier={dossier} />}
                {tab === "socio-economics" && <SocioEconomics id={id} />}
              </Block>
            </Block>
          )}
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
  );
};

export default ShowDossier;
