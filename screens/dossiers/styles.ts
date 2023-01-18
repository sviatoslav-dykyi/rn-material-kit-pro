import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../constants/utils";
import { materialTheme } from "../../constants";

const { width } = Dimensions.get("window");

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const styles = StyleSheet.create({
  container: { flex: 1 },
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
    fontSize: 12,
    paddingBottom: 10,
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
    marginTop: 15,
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
  homeImageContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  homeImage: {
    width: width * 0.4,
    //flex: 500,
  },
  imageBackground: {
    width: width * 0.9,
    // borderWidth: 2,
    // borderColor: "red",
  },
  showSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 7,
    color: "#3d454d",
  },
  showImage: {
    width: width,
    height: 200,
  },
  showFieldInfoBlock: { alignItems: "center", paddingTop: 15 },
  showFieldInfoText: { fontSize: 15, paddingLeft: 8 },
  showTabsBlock: { width: width * 0.9 },
  showTabBlock: {
    width: width,
  },
  showTab: {
    backgroundColor: "#38454f",
    alignItems: "center",
    width: width / 4,
    height: 85,
    paddingTop: 7,
    paddingBottom: 7,
  },
  showTabHighlighted: {
    backgroundColor: "#3f93e2",
  },
  showTabText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    paddingTop: 5,
  },
  showRatingBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showRatingContainerStyle: {
    flexDirection: "row-reverse",
    wordBreak: "break-word",
    //justifyContent: "flex-start",
  },
  bordered: {
    borderColor: "red",
    borderWidth: 2,
  },
  inputPaper: {
    width: width * 0.9,
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  inputPaperIcon: {
    marginBottom: -15,
  },
  submitDossierBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 20,
    width: 120,
  },
  submitDossierBtnText: {
    color: "white",
    fontSize: 19,
  },
  homeCreateButton: { position: "absolute", bottom: 12, right: 10 },
});

export const styles2 = StyleSheet.create({});
