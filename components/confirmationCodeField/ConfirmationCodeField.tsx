import {
  Animated,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";

import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import { Block, Button, theme, Text } from "galio-framework";
import { materialTheme } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = {
  uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
    }),
  ]).start();
};

const ConfirmationCodeField = ({
  value,
  setValue,
  onPress,
  error,
  isSubmitting,
  message,
  confirmButtonTitle = "VERIFY",
  title = "Verification",
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onPress: () => void;
  error?: string | null;
  isSubmitting?: boolean;
  message: string;
  confirmButtonTitle?: string;
  title?: string;
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation<Navigation>();

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.icon} source={source} />

      {!error ? (
        <Text style={styles.subTitle}>
          {message}
          {/* {"Please enter the  code \n"}
          we send to{" "}
          <Text style={{ textDecorationLine: "underline", color: "#777" }}>
            {email || "your email address"}
          </Text> */}
        </Text>
      ) : (
        <Text style={styles.subTitle}>{error}</Text>
      )}

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <Block flex center style={{ marginTop: 30 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={onPress}
          loading={isSubmitting}
        >
          {confirmButtonTitle}
        </Button>
        <Button
          size="large"
          color="transparent"
          shadowless
          onPress={() => navigation?.navigate("Sign In" as never)}
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
      {/* <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default ConfirmationCodeField;
