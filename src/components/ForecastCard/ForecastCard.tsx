import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { CustomText } from "@/components/CustomText";
import { colors } from "@/tokens/colors";

interface ForecastCardProps {
  temperature?: number;
  humidity?: number;
  name?: string;
  forecastIcon?: string;
}

export const ForecastCard = ({
  name = "",
  temperature = 0,
  humidity = 0,
  forecastIcon = "",
}: ForecastCardProps) => {
  const getBackgroundStyle = () => {
    if (temperature < 15) return styles.coolBackground;
    if (temperature >= 15 && temperature <= 25) return styles.warmBackground;
    return styles.hotBackground;
  };
  return (
    <View style={[styles.weatherForecast, getBackgroundStyle()]} testID="forecastCard">
      <CustomText size="lg">{name}</CustomText>
      <CustomText size="xl">{temperature}°C</CustomText>

      {forecastIcon ? (
        <Image
          style={styles.image}
          source={{ uri: `https:${forecastIcon}` }}
          contentFit="cover"
          transition={1000}
          alt="Image of a visual graphic representation of weather, like rainy, sunny, cloudy"
          testID="forecast-image"
        />
      ) : (
        <CustomText size="sm">No Image Available</CustomText>
      )}
      <CustomText size="lg">Umidade {humidity}%</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherForecast: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    height: 200,
    borderRadius: 5,
    marginTop: 15,
  },
  coolBackground: {
    backgroundColor: colors.blue.dark,
  },
  warmBackground: {
    backgroundColor: colors.yellow.dark,
  },
  hotBackground: {
    backgroundColor: colors.red.dark,
  },
  placeholder: {
    fontSize: 18,
    color: colors.gray.transparent,
  },
  image: {
    height: 50,
    width: 50,
  },
});
