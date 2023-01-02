import React, { ReactElement } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboardHOC = ({ children }: { children: ReactElement }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboardHOC;
