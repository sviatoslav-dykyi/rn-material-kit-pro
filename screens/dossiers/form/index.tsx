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
import {
  Card,
  Title,
  Paragraph,
  TextInput,
  HelperText,
} from "react-native-paper";

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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FormikValues } from "formik";
import { DossierTypeIds, DossierTypes } from "../../../utils/constants";
import { Dossier, DossierImage, DossierImageError } from "../types";
import { styles } from "../styles";
import AppartmentForm from "./Appartment";
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Carousel from "react-native-reanimated-carousel";
import HouseForm from "./House";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import {
  findAddressDetail,
  GOOGLE_API_KEY,
  onGoogleAutocompleteChange,
  pickDocument,
  pickImage,
} from "./utils";
import { Icon } from "../../../components";
import MultiFamilyHouseForm from "./MultiFamilyHouse";
import useOnFocus from "../../../hooks/useOnFocus";
import { upload } from "../edit/utils";
import { REACT_BASE_URL } from "../../../constants/utils";
import { ImagePickerResult } from "expo-image-picker";
import SearchBarWithAutocompleteWrapper from "../../../components/searchBarWithAutocomplete/Wrapper";
const { width } = Dimensions.get("window");

const CreateDossiersForm = ({
  handleChange,
  handleBlur,
  values,
  submitForm,
  touched,
  status,
  errors,
  setFieldValue,
  resetForm,
  setTouched,
  isSubmitting,
  mode = "create",
  addressText,
}: FormikValues): ReactElement => {
  const RichText = useRef(null);

  const [height, setHeight] = useState(MIN_HEIGHT_RICH_CONTAINER);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  console.log("errors", errors);
  const isFocused = useIsFocused();
  const isCarousel = React.useRef(null);
  useEffect(() => {
    if (isFocused) {
      resetForm();
    }
  }, [isFocused]);

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

  const handleConditionRate = (field: string) => (rating: number) => {
    setFieldValue(field, conditionRates[rating - 1].value);
  };

  const hanleButtonTypePress = (code: DossierTypes) => () => {
    setFieldValue("property.propertyType.subcode", "");
    setFieldValue("property.propertyType.code", code);
  };

  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);

  useEffect(() => {
    ref.current?.setAddressText(addressText);
  }, [addressText]);

  const removeImage = (index: number) => {
    const auxImages = [...values.images];
    auxImages.splice(index, 1);
    setFieldValue("images", auxImages);
  };

  const CarouselCardItem =
    (handleOnPress: (index: number) => void) =>
    ({ item, index }: any) => {
      return (
        <View style={[styles2.container, { position: "relative" }]} key={index}>
          <Image source={{ uri: item.imgUrl }} style={styles2.image} />
          <Button
            onlyIcon
            shadowColor={true}
            icon="delete"
            iconFamily="MaterialIcons"
            color="red"
            iconSize={30}
            onPress={() => {
              handleOnPress(index);
            }}
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              top: 0,
              right: 15,
            }}
          ></Button>
        </View>
      );
    };

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      {/* <Button
        icon="plus"
        iconFamily="Entypo"
        iconSize={20}
        textStyle={styles.submitDossierBtnText}
        //style={styles.submitDossierBtn}
        color={materialTheme.COLORS.BUTTON_COLOR}
        onPress={() => {
          submitForm();
        }}
        loading={isSubmitting}
      >
        {mode === "create" ? "Create" : "Edit"}
      </Button> */}
      <ScrollView nestedScrollEnabled={true}>
        <Block center>
          <TextInput
            style={[styles.inputPaper]}
            textColor="white"
            autoCapitalize="none"
            label={<Text style={styles.inputPaperLabel}>Title</Text>}
            underlineStyle={styles.inputPaperUnderlineStyle}
            value={values.title}
            onChangeText={handleChange("title")}
            left={
              <TextInput.Icon
                size={20}
                icon="clipboard-text-outline"
                color={() => "white"}
              />
            }
          />
          <HelperText
            type="error"
            visible={touched.title && (status?.errors.title || errors.title)}
          >
            {touched.title && (status?.errors.title || errors.title)}
          </HelperText>
          {/* <Block row style={styles.googlePlacesLabelContainer}>
            <Icon
              name="location-on"
              color="#fff"
              family="MaterialIcons"
              icon="location-on"
              iconSize={18}
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.pickerLabelText}>Address*</Text>
          </Block> */}
          <Block style={styles.ratingBlock}>
            <SearchBarWithAutocompleteWrapper
              mode={mode}
              addressText={addressText}
              onSuccess={(location) => {
                setFieldValue("property.location", location);
              }}
            />
          </Block>

          {/* <Block>
        <Block
          style={{
            borderColor: "red",
            borderWidth: 2,
            height: 200,
            width: 400,
          }}
        >
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            onPress={(_, details = null) => {
              console.log("www1");
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
            // styles={{
            //   borderColor: "red",
            //   borderWidth: 2,
            //   height: 200,
            // }}
            fetchDetails
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </Block>
      </Block> */}

          {/* <ScrollView
        horizontal={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        style={[
          styles.googlePlacesContainer,
          {
            top: 135,
            position: "absolute",
            flex: 1,
          },
        ]}
      >
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search"
          onPress={onGoogleAutocompleteChange({
            setFieldValue,
            setTouched,
            touched,
          })}
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
      </ScrollView> */}
          <HelperText
            style={{ marginTop: 10 }}
            type="error"
            visible={
              touched.property?.location?.address.postCode &&
              Object.values(errors.property?.location?.address || []).filter(
                (el) => el
              ).length
            }
          >
            {touched.property?.location?.address.postCode && (
              <>
                Address is not correct (
                {Object.values(errors.property?.location?.address || [])?.map(
                  (el, _, arr) =>
                    `${el}${el !== arr[arr.length - 1] ? ", " : ""}`
                )}
                )
              </>
            )}
          </HelperText>

          <Block row style={[styles.typesBlock, { marginTop: 20 }]}>
            {dossierTypes.map(({ value, label, icon }) => (
              <Button
                key={value}
                style={[
                  styles.typesButtons,
                  values.property?.propertyType?.code == value &&
                    styles.selected,
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
                handleQualityRate,
                handleConditionRate,
                mode,
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
                handleQualityRate,
                handleConditionRate,
                mode,
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
                handleQualityRate,
                handleConditionRate,
                mode,
              }}
            />
          )}
          <Block style={{ width: width * 0.9, paddingBottom: 10 }}>
            <Text style={[styles.showSubtitle, { color: "#000" }]}>
              Description
            </Text>
          </Block>
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
              initialContentHTML={values.description}
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

          <Block style={{ width: width * 0.9 }}>
            <Text style={[styles.showSubtitle, { color: "#000" }]}>Photos</Text>
            <Button
              onPress={pickImage({
                setImageIsLoading,
                setImageErrors,
                setFieldValue,
                values,
              })}
              icon={"picture"}
              iconFamily="AntDesign"
              iconSize={19}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                //width: 200,
                borderRadius: 30,
                marginLeft: 0,
                height: 48,
              }}
            >
              Upload
            </Button>
          </Block>

          {/* <Block flex row>
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
              onPress={pickImage({
                setImageIsLoading,
                setImageErrors,
                setFieldValue,
                values,
              })}
              icon={"picture"}
              iconFamily="AntDesign"
              iconSize={19}
            >
              Upload images
            </Button>
          </Block> */}
          {/* <Block>
            {values.images?.map(({ url }: DossierImage, i: number) => (
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
                    height: 100,
                    // height:
                    //   width > height
                    //     ? (height / width) * styles.homeImage.width
                    //     : 130,
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
            ))}
          </Block> */}
          {values?.images?.length > 0 && (
            <View style={{ width: width * 0.9, paddingTop: 20 }}>
              <Carousel
                loop={true}
                width={width}
                height={width / 2}
                autoPlay={false}
                data={values.images?.map(({ url }: DossierImage) => ({
                  imgUrl: url,
                }))}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log("current index:", index)}
                renderItem={CarouselCardItem(removeImage)}
                mode="horizontal-stack"
                enabled={values?.images?.length > 1}
                modeConfig={{
                  snapDirection: "left",
                  moveSize: 400,
                  stackInterval: 30,
                  scaleInterval: 0.08,
                  rotateZDeg: 135,
                }}
              />
            </View>
          )}
          {imageIsLoading && (
            <Block style={styles.activityIndicator}>
              <ActivityIndicator
                size="large"
                color={materialTheme.COLORS.BUTTON_COLOR}
              />
            </Block>
          )}
          {imageErrors.map((error) => (
            <View>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          ))}
          <Block style={{ width: width * 0.9 }}>
            <Text style={[styles.showSubtitle, { color: "#000" }]}>
              Attachments
            </Text>
            <Button
              onPress={pickDocument}
              icon={"documents"}
              iconFamily="Entypo"
              iconSize={19}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                //width: 200,
                borderRadius: 30,
                marginLeft: 0,
                height: 48,
              }}
            >
              Upload
            </Button>
          </Block>
          <Block style={{ paddingTop: 50 }}>
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
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CreateDossiersForm;
