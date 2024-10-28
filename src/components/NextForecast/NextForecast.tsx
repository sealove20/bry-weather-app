import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { NextForecastList } from "@/resources/weather/types";
import { formatDate } from "@/commons/formatters/date";
import { CustomText } from "../CustomText";

interface NextForecastProps {
  nextForecast?: NextForecastList;
}

export const NextForecast = ({ nextForecast }: NextForecastProps): JSX.Element => {
  return (
    <>
      <View>
        <CustomText size="sm">{nextForecast?.averageTemperature}°C</CustomText>
        <Image
          style={styles.image}
          source={{ uri: `https:${nextForecast?.forecastIcon}` }}
          contentFit="cover"
          transition={500}
          alt="Image of a visual graphic representation of weather, like rainy, sunny, cloudy"
          testID="forecast-image"
        />
      </View>
      <CustomText size="sm">Umidade {nextForecast?.averageHumidity}%</CustomText>
      <CustomText size="sm">{formatDate(nextForecast?.forecastDate!)}</CustomText>
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
