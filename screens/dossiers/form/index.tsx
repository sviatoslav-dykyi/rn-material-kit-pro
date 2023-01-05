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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import HouseForm from "./House";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import {
  findAddressDetail,
  GOOGLE_API_KEY,
  onGoogleAutocompleteChange,
  pickImage,
} from "./utils";
import { Icon } from "../../../components";
import MultiFamilyHouseForm from "./MultiFamilyHouse";
import useOnFocus from "../../../hooks/useOnFocus";
import { upload } from "../edit/utils";
import { REACT_BASE_URL } from "../../../constants/utils";
import { ImagePickerResult } from "expo-image-picker";

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

  const isFocused = useIsFocused();

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

  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);

  useEffect(() => {
    ref.current?.setAddressText(addressText);
  }, [addressText]);

  return (
    <Block flex={1} center space="between" style={{ paddingBottom: 200 }}>
      {/* <Text>errors={JSON.stringify(errors)}</Text>
      <Text>touched={JSON.stringify(touched)}</Text> */}
      {/* <Text>
        values.property.hasLift={JSON.stringify(errors)}
      </Text>
      <Text>
        {JSON.stringify(values.property.propertyType, values.dealType)}
        {JSON.stringify(values)}
      </Text> */}
      <Button
        size="large"
        shadowless
        style={{ height: 48 }}
        color={materialTheme.COLORS.BUTTON_COLOR}
        onPress={() => {
          submitForm();
        }}
        loading={isSubmitting}
      >
        {mode === "create" ? "CREATE" : "EDIT"}
      </Button>

      <Block center style={[]}>
        {/* <Input
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
        /> */}
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
        {/* city: Yup.number().required("City is not correct"),
          street: Yup.number().required("Street is not correct"),
          houseNumber: Yup.number().required("House number is not correct"), */}

        {/* <Text>{JSON.stringify(values.property.location.address)}</Text> */}
        <Block row style={styles.googlePlacesLabelContainer}>
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
        </Block>
        {/* <ScrollView
          horizontal={false}
          style={[styles.disableScrollingWarning, { marginBottom: -15 }]}
        >
          <ScrollView horizontal={true} style={styles.disableScrollingWarning}>
            <View style={[styles.googlePlacesContainer]}>
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
        </ScrollView> */}
        <ScrollView
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
        </ScrollView>
        <HelperText
          style={{ marginTop: 50 }}
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
                (el, _, arr) => `${el}${el !== arr[arr.length - 1] ? ", " : ""}`
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
                values.property?.propertyType?.code == value && styles.selected,
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
        <Block flex row>
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
        </Block>
        <Block>
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
        </Block>
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
        <Block flex={10}>
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
      {/* <Block flex center style={{ marginTop: 20 }}>
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
      </Block> */}
    </Block>
  );
};

export default React.memo(CreateDossiersForm);
