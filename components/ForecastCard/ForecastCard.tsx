import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { colors } from "../../styles/colors";

interface ForecastCardProps {
  temperature?: number;
  humidity?: number;
  name?: string;
  forecastIcon?: string;
}

export const ForecastCard = ({ name, temperature, humidity, forecastIcon }: ForecastCardProps) => {
  return (
    <View style={styles.weatherForecast}>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Image
        style={styles.image}
        source={{ uri: `https:${forecastIcon}` }}
        contentFit="cover"
        transition={1000}
        alt="Image of a visual graphic representation of weather, like rainy, sunny, cloudy"
        testID="forecast-image"
      />
      <Text style={styles.humidity}>Umidade {humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherForecast: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    height: 200,
    backgroundColor: colors.gray.transparent,
    borderRadius: 5,
    marginTop: 15,
  },
  temperature: {
    fontSize: 30,
    color: colors.white,
  },
  city: {
    fontSize: 24,
    color: colors.white,
  },
  humidity: {
    fontSize: 24,
    color: colors.white,
  },
  image: {
    height: 50,
    width: 50,
  },
});
