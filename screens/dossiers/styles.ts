import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../constants/utils";
import { materialTheme } from "../../constants";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  typesBlock: {
    width: width * 0.9,
    justifyContent: "space-between",
    marginTop: -30,
    marginBottom: 15,
    z: 111,
  },
  typesButtons: {
    flexShrink: 1,
    margin: 0,
    width: "32%",
    borderColor: "red",
    borderWidth: 0,
  },
  selected: {
    borderWidth: 1,
  },
  pickerLabel: {
    width: width * 0.9,
    color: materialTheme.COLORS.PLACEHOLDER,
    marginBottom: -15,
  },
  pickerLabelText: {
    paddingTop: 2,
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  pickerLabelIcon: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  picker: {
    //width: width * 0.93,
    width: width * 0.8,
  },
  checkboxBlock: {
    width: width * 0.9,
    paddingTop: 10,
    paddingBottom: 10,
  },
  ratingBlock: {
    width: width * 0.9,
    borderBottomColor: materialTheme.COLORS.BUTTON_COLOR,
    borderBottomWidth: 1,
  },
  ratingBlockTitle: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  ratingBlockSubTitle: {
    paddingBottom: 3,
    paddingTop: 10,
  },
  ratingContainerStyle: {
    flexDirection: "column-reverse",
    wordBreak: "break-word",
    width: "100%",
  },
  checkboxText: { color: materialTheme.COLORS.PLACEHOLDER, paddingLeft: 16 },
  checkbox: { marginRight: "18%", paddingLeft: 14 },
  //rich-editor
  richContainer: { marginBottom: 100 },
  richBar: {
    height: 50,
    width: width * 0.9,
    backgroundColor: "#F5FCFF",
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
  dropDownPickerBlock: {
    width: width * 0.9,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    zIndex: 2,
  },
  dropDownPickerContainer: { width: width * 0.9 },
  googlePlacesLabelContainer: {
    width: width * 0.9,
    color: materialTheme.COLORS.PLACEHOLDER,
    marginBottom: 15,
    marginTop: 20,
  },
  googlePlacesContainer: {
    width: width * 0.9,
    backgroundColor: "transparent",
    zIndex: 222,
  },
  googlePlacesAutocomplete: {
    width: width * 0.9,
  },
  disableScrollingWarning: {
    width: "100%",
  },
  activityIndicator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export const styles2 = StyleSheet.create({});