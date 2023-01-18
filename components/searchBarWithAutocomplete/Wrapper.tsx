import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  Text,
} from "react-native";
import axios from "axios";
import {
  findAddressDetail,
  GOOGLE_API_KEY,
  GOOGLE_PACES_API_BASE_URL,
} from "../../screens/dossiers/form/utils";
import { useDebounce } from "../../hooks/useDebounce";
import SearchBarWithAutocomplete from ".";
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("window");
/**
 * Prediction's type returned from Google Places Autocomplete API
 * https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
 */
export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  tructured_formatting: Object;
  terms: Object[];
  types: string[];
};

const SearchBarWithAutocompleteWrapper = ({
  mode,
  addressText,
  onSuccess,
}: {
  mode: any;
  addressText: string;
  onSuccess: (location: any) => void;
}) => {
  const [search, setSearch] = useState({
    term: mode === "create" ? "" : addressText,
    fetchPredictions: false,
  });
  const [showPredictions, setShowPredictions] = useState(false);
  const [predictions, setPredictions] = useState<PredictionType[]>([]);

  const { container } = styles;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSearch({ term: "", fetchPredictions: false });
    }
  }, [isFocused]);

  useEffect(() => {
    setSearch({ term: addressText, fetchPredictions: false });
  }, [addressText]);

  const onChangeText = async () => {
    if (search.term.trim() === "") return;
    if (!search.fetchPredictions) return;

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useDebounce(onChangeText, 1000, [search.term]);

  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    try {
      const result = await axios.request({
        method: "post",
        url: apiUrl,
      });
      if (result) {
        const details = result?.data?.result;

        if (!details) return;
        const { geometry, address_components } = details;
        const latitude = geometry.location.lat;
        const longitude = geometry.location.lng;
        const postCode = findAddressDetail(address_components, "postal_code");
        const city = findAddressDetail(
          address_components,
          "administrative_area_level_1"
        );
        const street = findAddressDetail(address_components, "route");
        const houseNumber = findAddressDetail(
          address_components,
          "street_number"
        );
        const location = {
          address: {
            postCode,
            city,
            street,
            houseNumber,
          },
          coordinates: {
            latitude,
            longitude,
          },
        };

        onSuccess && onSuccess(location);
        setShowPredictions(false);
        setSearch({ term: description, fetchPredictions: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={[container]}>
        <View>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
            onCancel={() => {
              setSearch({ term: "", fetchPredictions: false });
              onSuccess({
                address: {
                  city: "",
                  houseNumber: "",
                  postCode: "",
                  street: "",
                },
                coordinates: { latitude: 0, longitude: 0 },
              });
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchBarWithAutocompleteWrapper;
