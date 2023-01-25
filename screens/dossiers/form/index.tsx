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
import CarouselCustom from "../../../components/carousel";
import { extractFullAddress } from "../../home/utils";
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
}: FormikValues): ReactElement => {
  const RichText = useRef(null);

  const [height, setHeight] = useState(MIN_HEIGHT_RICH_CONTAINER);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  const [documentIsLoading, setDocumentIsLoading] = useState(false);
  const [documentError, setDocumentError] = useState("");

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
    setFieldValue("property.propertyType.code", code);
  };

  const removeImage = (index: number) => {
    const auxImages = [...values.images];
    auxImages.splice(index, 1);
    setFieldValue("images", auxImages);
  };

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      {/* <Button
        icon="plus"
        iconFamily="Entypo"
        iconSize={20}
        textStyle={styles.submitDossierBtnText}
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
          <Block style={styles.ratingBlock}>
            <SearchBarWithAutocompleteWrapper
              mode={mode}
              addressText={
                mode === "create"
                  ? ""
                  : extractFullAddress(values.property.location)
              }
              onSuccess={(location) => {
                setFieldValue("property.location", location);
              }}
            />
          </Block>

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
                borderRadius: 30,
                marginLeft: 0,
                height: 48,
              }}
            >
              Upload
            </Button>
          </Block>

          {values?.images?.length > 0 && (
            <View style={{ width: width * 0.9, paddingTop: 20 }}>
              <CarouselCustom images={values.images} callback={removeImage} />
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
              onPress={pickDocument({
                setDocumentIsLoading,
                setDocumentError,
                setFieldValue,
              })}
              icon={"documents"}
              iconFamily="Entypo"
              iconSize={19}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 30,
                marginLeft: 0,
                height: 48,
              }}
            >
              Upload
            </Button>
            {documentIsLoading && (
              <Block style={styles.activityIndicator}>
                <ActivityIndicator
                  size="large"
                  color={materialTheme.COLORS.BUTTON_COLOR}
                />
              </Block>
            )}
            <HelperText type="error" visible={Boolean(documentError)}>
              {documentError}
            </HelperText>
          </Block>
          <Block style={{ paddingTop: 50, paddingBottom: 100 }}>
            <Button
              size="large"
              style={{ height: 48 }}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => {
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

export default CreateDossiersForm;
