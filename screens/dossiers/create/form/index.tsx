import React, { useState, ReactElement, useRef, useCallback } from "react";
import { Block, Button, Input, Text, theme } from "galio-framework";
import { materialTheme } from "../../../../constants";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { dossierTypes, MIN_HEIGHT_RICH_CONTAINER } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { FormikValues } from "formik";
import { DossierTypeIds } from "../../../../utils/constants";
import { Dossier } from "../types";
import { styles } from "../styles";
import AppartmentForm from "./Appartment";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import HouseForm from "./House";

const CreateDossiersForm = ({
  handleChange,
  handleBlur,
  values,
  submitForm,
  touched,
  status,
  errors,
  setFieldValue,
  state,
  toggleActive,
}: FormikValues): ReactElement => {
  const navigation = useNavigation();
  const RichText = useRef(null);
  const [height, setHeight] = useState(MIN_HEIGHT_RICH_CONTAINER);
  const [image, setImage] = useState(null);

  const handleConditionRate = (field: string) => (rating: number) =>
    setFieldValue(field, Number(rating));

  const handleEditorTextChange = (newText: string) =>
    setFieldValue("description", newText);

  const handleHeightChange = (newHeight: number) =>
    setHeight(
      newHeight < MIN_HEIGHT_RICH_CONTAINER
        ? MIN_HEIGHT_RICH_CONTAINER
        : Number(newHeight)
    );

  const handleQualityRate = (field: keyof Dossier) => (rating: number) =>
    setFieldValue(field, Number(rating));

  const hanleButtonTypePress = (id: DossierTypeIds) => () =>
    setFieldValue("typeId", id);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      //console.log("res", res);
      //this.uploadAPICall(res); //here you can call your API and send the data to that API
    } catch (err) {
      //console.log("error--");
    }
  };

  const pickImage = async () => {
    try {
      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("www");
      if (!result.canceled) {
        // console.log("111");
        console.log("result", result);
        //setImage(result.assets[0].uri);
      }
      //this.uploadAPICall(res); //here you can call your API and send the data to that API
    } catch (err) {
      console.log("error -----", err);
    }
    // No permissions request is necessary for launching the image library
  };
  return (
    <Block flex={1} center space="between">
      <Block center>
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Title"
          autoCapitalize="none"
          style={[styles.input, state.active.title ? styles.inputActive : null]}
          onBlur={() => {
            toggleActive("title");
            handleBlur("title");
          }}
          onFocus={() => toggleActive("title")}
          onChangeText={handleChange("title")}
          value={values.title}
          bottomHelp
          help={touched.title && (status?.errors.title || errors.title)}
          icon="article"
          family="MaterialIcons"
          iconSize={18}
          label={values.title ? undefined : "Title"}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Enter your address"
          autoCapitalize="none"
          style={[
            styles.input,
            state.active.address ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("address");
            handleBlur("address");
          }}
          onFocus={() => toggleActive("address")}
          onChangeText={handleChange("address")}
          value={values.address}
          bottomHelp
          help={touched.address && (status?.errors.address || errors.address)}
          icon="location-on"
          family="MaterialIcons"
          iconSize={18}
          label={values.address ? undefined : "Address"}
        />
        <Block row style={styles.typesBlock}>
          {dossierTypes.map(({ id, name, icon }) => (
            <Button
              key={id}
              style={[
                styles.typesButtons,
                values.typeId == id && styles.selected,
                { height: 65 },
              ]}
              size={"small"}
              onPress={hanleButtonTypePress(id)}
              icon={icon}
              iconFamily="MaterialIcons"
              iconSize={19}
            >
              {name}
            </Button>
          ))}
        </Block>
        {values.typeId === DossierTypeIds.APPARTMENT && (
          <AppartmentForm
            {...{
              handleChange,
              handleBlur,
              values,
              touched,
              status,
              errors,
              setFieldValue,
              state,
              toggleActive,
              handleQualityRate,
              handleConditionRate,
            }}
          />
        )}
        {values.typeId === DossierTypeIds.HOUSE && (
          <HouseForm
            {...{
              handleChange,
              handleBlur,
              values,
              touched,
              status,
              errors,
              setFieldValue,
              state,
              toggleActive,
              handleQualityRate,
              handleConditionRate,
            }}
          />
        )}
        <Block
          style={[
            styles.richContainer,
            {
              height,
            },
          ]}
        >
          <RichEditor
            disabled={false}
            containerStyle={[
              {
                flexBasis: height,
              },
            ]}
            ref={RichText}
            style={[
              {
                flexBasis: height,
              },
            ]}
            placeholder={"Start Writing Here"}
            onChange={handleEditorTextChange}
            onHeightChange={handleHeightChange}
          />
          <RichToolbar
            style={[styles.richBar, { marginTop: 5 }]}
            editor={RichText}
            disabled={false}
            iconTint={"purple"}
            selectedIconTint={"pink"}
            disabledIconTint={"purple"}
            iconMap={{
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
              ),
            }}
          />
        </Block>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            uppercase
            onPress={pickDocument}
            icon={"star"}
            iconFamily="AntDesign"
            iconSize={19}
          >
            Upload document
          </Button>
          <Button
            uppercase
            onPress={pickImage}
            icon={"picture"}
            iconFamily="AntDesign"
            iconSize={19}
          >
            Upload images
          </Button>
        </View>
      </Block>
      <Block flex center style={{ marginTop: 20 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => {
            submitForm();
          }}
        >
          CREATE
        </Button>
        <Button
          size="large"
          color="transparent"
          shadowless
          onPress={() => navigation.navigate("Sign In" as never)}
        >
          <Text
            center
            color={theme.COLORS?.WHITE}
            size={(theme.SIZES?.FONT || 0) * 0.75}
          >
            Already have an account? Sign In
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default CreateDossiersForm;
