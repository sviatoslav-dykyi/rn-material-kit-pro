import { Platform, StatusBar, Dimensions } from "react-native";
import { theme } from "galio-framework";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 4 + StatusHeight;
export const iPhoneX = () =>
  Platform.OS === "ios" && (height === 812 || width === 812);

export const REACT_BASE_URL = "http://127.0.0.1:5001/api/v1"; // - for mac testing
//export const REACT_BASE_URL = "http://192.168.31.44:5001/api/v1"; // - for Iphone testing
