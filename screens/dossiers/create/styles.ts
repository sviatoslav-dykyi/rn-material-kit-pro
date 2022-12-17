import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../../constants/utils";
import { materialTheme } from "../../../constants";

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
    marginTop: 10,
    marginBottom: 15,
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
    marginBottom: -35,
  },
  pickerLabelText: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  pickerLabelIcon: {
    paddingLeft: 17,
    paddingRight: 17,
  },
  picker: {
    width: width * 0.93,
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
  checkboxText: { color: materialTheme.COLORS.PLACEHOLDER, paddingLeft: 10 },
});
