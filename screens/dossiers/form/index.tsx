import React, {
  useState,
  ReactElement,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  Block,
  Button,
  Input,
  Text,
  theme,
  Card as CardGalio,
} from "galio-framework";
import { materialTheme } from "../../../constants";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import {
  conditionRates,
  dossierTypes,
  MIN_HEIGHT_RICH_CONTAINER,
  qualityRates,
} from "../utils";
import { useNavigation } from "@react-navigation/native";
import { FormikValues } from "formik";
import { DossierTypeIds, DossierTypes } from "../../../utils/constants";
import { Dossier } from "../types";
import { styles } from "../styles";
import AppartmentForm from "./Appartment";
import { Dimensions, ScrollView, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import HouseForm from "./House";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { findAddressDetail, GOOGLE_API_KEY } from "./utils";
import { Icon } from "../../../components";
import MultiFamilyHouseForm from "./MultiFamilyHouse";
import { DossierImage } from "./types";

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
  isSubmitting,
  mode = "create",
  addressText,
}: FormikValues): ReactElement => {
  const navigation = useNavigation();
  const RichText = useRef(null);
  const [height, setHeight] = useState(MIN_HEIGHT_RICH_CONTAINER);
  const [image, setImage] = useState(null);

  const handleEditorTextChange = (newText: string) =>
    setFieldValue("description", newText);

  const handleHeightChange = (newHeight: number) =>
    setHeight(
      newHeight < MIN_HEIGHT_RICH_CONTAINER
        ? MIN_HEIGHT_RICH_CONTAINER
        : Number(newHeight)
    );

  const handleQualityRate = (field: keyof Dossier) => (rating: number) =>
    setFieldValue(field, qualityRates[rating - 1].value);

  const handleConditionRate = (field: string) => (rating: number) =>
    setFieldValue(field, conditionRates[rating - 1].value);

  const hanleButtonTypePress = (code: DossierTypes) => () =>
    setFieldValue("property.propertyType.code", code);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      //console.log("res123213", res);
      //this.uploadAPICall(res); //here you can call your API and send the data to that API
    } catch (err) {
      //console.log("error--");
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    //console.log("addressText", addressText);
    // @ts-ignore
    ref.current?.setAddressText(addressText);
  }, [addressText]);

  const pickImage = async () => {
    try {
      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const auxImages = result.assets.map(
          ({
            uri,
            fileName,
            width,
            height,
          }: {
            uri: string;
            fileName: string;
            width: number;
            height: number;
          }) => ({
            filename: fileName,
            url: uri,
            width,
            height,
          })
        );
        setFieldValue("images", [...auxImages]);
      }
    } catch (err) {
      console.log("error -----", err);
    }
  };

  return (
    <Block flex={1} center space="between" style={{ paddingBottom: 200 }}>
      {/* <Text>22{JSON.stringify(values.images)}</Text> */}
      {/* <Text>{JSON.stringify(addressText)}</Text> */}
      <Button
        size="large"
        shadowless
        style={{ height: 48 }}
        color={materialTheme.COLORS.BUTTON_COLOR}
        onPress={() => {
          //console.log("values", values);
          submitForm();
        }}
      >
        {mode === "create" ? "CREATE" : "EDIT"}
      </Button>
      <Text>{JSON.stringify(values.images, null, 2)}</Text>
      <Button
        size="large"
        color="transparent"
        shadowless
        onPress={() => navigation.navigate("Sign In" as never)}
      ></Button>
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
          help={touched.title && (status?.errors?.title || errors?.title)}
          icon="article"
          family="MaterialIcons"
          iconSize={18}
          //label={values.title ? undefined : "Title"}
        />
        <Block row style={styles.googlePlacesLabelContainer}>
          <Icon
            name="location-on"
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            icon="location-on"
            iconSize={18}
            size={20}
            style={styles.pickerLabelIcon}
          />
          <Text style={styles.pickerLabelText}>Address:</Text>
        </Block>
        <ScrollView
          horizontal={false}
          style={[styles.disableScrollingWarning, { marginBottom: -15 }]}
        >
          <ScrollView horizontal={true} style={styles.disableScrollingWarning}>
            <View style={styles.googlePlacesContainer}>
              <GooglePlacesAutocomplete
                ref={ref}
                placeholder="Search"
                onPress={(_, details = null) => {
                  if (!details) return;
                  const { geometry, address_components } = details;
                  const latitude = geometry.location.lat;
                  const longitude = geometry.location.lng;
                  const postCode = findAddressDetail(
                    address_components,
                    "postal_code"
                  );
                  const city = findAddressDetail(
                    address_components,
                    "administrative_area_level_1"
                  );
                  const street = findAddressDetail(address_components, "route");
                  const houseNumber = findAddressDetail(
                    address_components,
                    "street_number"
                  );
                  const location = {
                    address: {
                      postCode,
                      city,
                      street,
                      houseNumber,
                    },
                    coordinates: {
                      latitude,
                      longitude,
                    },
                  };
                  setFieldValue("property.location", location);
                }}
                styles={{
                  borderColor: "red",
                  borderWidth: 2,
                  height: 200,
                }}
                fetchDetails
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                }}
              />
            </View>
          </ScrollView>
        </ScrollView>
        <Block row style={styles.typesBlock}>
          {dossierTypes.map(({ value, label, icon }) => (
            <Button
              key={value}
              style={[
                styles.typesButtons,
                values.property.propertyType.code == value && styles.selected,
                { height: 65 },
              ]}
              size={"small"}
              onPress={hanleButtonTypePress(value)}
              icon={icon}
              iconFamily="MaterialIcons"
              iconSize={19}
            >
              {label}
            </Button>
          ))}
        </Block>
        {values.property.propertyType.code === DossierTypes.APARTMENT && (
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
        {values.property.propertyType.code === DossierTypes.HOUSE && (
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
        {values.property.propertyType.code ===
          DossierTypes.MULTI_FAMILY_HOUSE && (
          <MultiFamilyHouseForm
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
        <Block>
          <Text>{JSON.stringify(values.images, null, 2)}</Text>
          {values.images.map(
            ({ url, width, height }: DossierImage, i: number) => (
              <Block
                row
                space="between"
                key={url + " " + i}
                style={styles.homeImageContainer}
              >
                <Image
                  key={i + " " + Math.random()}
                  style={{
                    width: styles.homeImage.width,
                    height:
                      width > height
                        ? (height / width) * styles.homeImage.width
                        : 130,
                  }}
                  source={{ uri: url }}
                  resizeMode="contain"
                />
                <Button
                  onlyIcon
                  shadowColor={true}
                  icon="delete"
                  iconFamily="MaterialIcons"
                  color="red"
                  iconSize={30}
                  onPress={() => {
                    const auxImages = [...values.images];
                    auxImages.splice(i, 1);
                    setFieldValue("images", auxImages);
                  }}
                  style={{ width: 40, height: 40 }}
                ></Button>
              </Block>
            )
          )}
        </Block>
      </Block>
      <Block flex center style={{ marginTop: 20 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => {
            //console.log("values", values);
            submitForm();
          }}
          loading={isSubmitting}
        >
          {mode === "create" ? "CREATE" : "EDIT"}
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
