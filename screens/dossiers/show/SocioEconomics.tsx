import React, { ReactElement, useEffect, useState } from "react";
import { Dimensions, View, Text, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { materialTheme } from "../../../constants";
import { styles } from "../styles";
import { fetchSocioEconomicData } from "./utils";

const SocioEconomics = ({ id }: any): ReactElement => {
  const [socioEconomic, setSocioEconomic] = useState<any>();
  const [employedPopulation, setEmployedPopulation] = useState<any>();
  const [isSocioEconomicLoading, setSocioEconomicLoading] = useState(false);

  useEffect(() => {
    fetchSocioEconomicData({
      setSocioEconomic,
      setSocioEconomicLoading,
      id,
      setEmployedPopulation,
    });
  }, [id]);

  if (isSocioEconomicLoading) {
    return (
      <View style={[styles.activityIndicator, { marginTop: 150 }]}>
        <ActivityIndicator
          size="large"
          color={materialTheme.COLORS.BUTTON_COLOR}
        />
      </View>
    );
  }

  const years = socioEconomic?.divisions[0].years;
  const yearsEmployedPupulation = employedPopulation?.divisions[0].years;

  return (
    <View>
      {years && (
        <>
          <Text style={styles.showSubtitle}>Population size</Text>
          <LineChart
            data={{
              labels: years?.map(({ year }: any) => year),
              datasets: [
                {
                  data: years?.map(
                    ({ values }: any) => values?.[0]?.absoluteValue / 1000 || 0
                  ),
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      )}
      {yearsEmployedPupulation && (
        <>
          <Text style={styles.showSubtitle}>Employed population</Text>
          <LineChart
            data={{
              labels: yearsEmployedPupulation?.map(({ year }: any) => year),
              datasets: [
                {
                  data: yearsEmployedPupulation?.map(
                    ({ values }: any) => values?.[0]?.absoluteValue / 1000 || 0
                  ),
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      )}
    </View>
  );
};

export default SocioEconomics;
