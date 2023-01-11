import { Button, Input } from "galio-framework";
import React, { FunctionComponent, useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { materialTheme } from "../../constants";
import { PredictionType } from "./Wrapper";

type SearchBarProps = {
  value: string;
  style?: ViewStyle | ViewStyle[];
  onChangeText: (text: string) => void;
  predictions: PredictionType[];
  showPredictions: boolean;
  onPredictionTapped: (placeId: string, description: string) => void;
  onCancel: () => void;
};

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = (
  props
) => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
    onCancel,
  } = props;

  const { container, inputStyle } = styles;
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      };

  const _renderPredictions = (predictions: PredictionType[]) => {
    const { predictionsContainer, predictionRow } = styles;
    const calculatedStyle = {
      width: inputSize.width,
    };

    return (
      <ScrollView horizontal={false}>
        <ScrollView horizontal={true}>
          <FlatList
            nestedScrollEnabled
            data={predictions}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={predictionRow}
                  onPress={() =>
                    onPredictionTapped(item.place_id, item.description)
                  }
                >
                  <Text numberOfLines={1}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            style={[predictionsContainer, calculatedStyle]}
          />
        </ScrollView>
      </ScrollView>
    );
  };

  return (
    <View
      style={[
        container,
        {
          ...passedStyles,
        },
      ]}
    >
      {/* <Button
        onlyIcon
        icon="close"
        iconFamily="ionicon"
        iconSize={30}
        iconColor="#fff"
        onPress={onCancel}
        style={styles.closeIcon}
      ></Button> */}
      {/* <Input
        right
        //placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
        placeholder="Search by address"
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
        icon="close"
        family="MaterialIcons"
        iconSize={18}
      /> */}

      <TextInput
        placeholder="Search by address"
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        numberOfLines={1}
        underlineStyle={{
          borderColor: materialTheme.COLORS.BUTTON_COLOR,
          borderWidth: 1,
        }}
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
        right={<TextInput.Icon icon="close" onPress={onCancel} />}
      />
      {showPredictions && _renderPredictions(predictions)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
  },
  inputStyle: {
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#cfcfcf",
    borderRadius: 20,
    color: "black",
    fontSize: 16,
  },
  predictionsContainer: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 5,
    right: -3,
    width: 30,
    height: 30,
    zIndex: 1111111,
  },
});

export default SearchBarWithAutocomplete;
