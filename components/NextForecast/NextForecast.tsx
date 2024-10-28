import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { NextForecastList } from "../../resources/weather/types";
import { formatDate } from "../../commons/formatters/date";

interface NextForecastProps {
  nextForecast: NextForecastList | undefined;
}

export const NextForecast = ({ nextForecast }: NextForecastProps): JSX.Element => {
  return (
    <>
      <View>
        <Text style={styles.temperature}>{nextForecast?.averageTemperature}°C</Text>
        <Image
          style={styles.image}
          source={{ uri: `https:${nextForecast?.forecastIcon}` }}
          contentFit="cover"
          transition={500}
          testID="forecast-image"
        />
      </View>
      <Text style={styles.humidity}>Umidade {nextForecast?.averageHumidity}%</Text>
      <Text style={styles.humidity}>{formatDate(nextForecast?.forecastDate!)}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  weatherForecastMiniatureContainer: {
    alignItems: "center",
    width: "90%",
    gap: 15,
  },
  temperature: {
    fontSize: 18,
    color: "white",
  },
  image: {
    height: 40,
    width: 40,
  },
  humidity: {
    fontSize: 18,
    color: "white",
  },
});
