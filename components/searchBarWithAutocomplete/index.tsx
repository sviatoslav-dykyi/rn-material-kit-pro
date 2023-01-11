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

  const { container } = styles;
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
      <TextInput
        placeholder="Search by address"
        placeholderTextColor="gray"
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        multiline={true}
        numberOfLines={1}
        style={[styles.inputStyle]}
        outlineStyle={[styles.outlineStyle, inputBottomRadius]}
        outlineColor="transparent"
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
        right={
          <TextInput.Icon style={styles.icon} icon="close" onPress={onCancel} />
        }
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
    fontSize: 14,
    backgroundColor: "#fff",
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
  icon: {
    top: 5,
  },
  outlineStyle: {
    borderRadius: 10,
  },
});

export default SearchBarWithAutocomplete;
