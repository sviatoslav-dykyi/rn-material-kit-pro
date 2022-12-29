import { StyleSheet, Platform, Dimensions } from "react-native";
import { materialTheme } from "../../constants";

const { width } = Dimensions.get("window");
export const CELL_SIZE = (width * 0.9) / 8;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    width: width * 0.9,
  },
  cell: {
    marginHorizontal: 0,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  // =======================

  root: {
    width: width,
    borderColor: "red",
    borderWidth: 2,
    minHeight: 800,
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: materialTheme.COLORS.PLACEHOLDER,
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
    width: width * 0.9,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});

export default styles;
