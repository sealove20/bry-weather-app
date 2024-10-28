import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { CurrentForecast as CurrentForecastInterface } from "../../resources/weather/types";

interface CurrentForecastProps {
  currentForecast: CurrentForecastInterface | undefined;
}

export const CurrentForecast = ({ currentForecast }: CurrentForecastProps) => {
  return (
    <View style={styles.weatherForecast}>
      <Text style={styles.city}>{currentForecast?.name}</Text>
      <Text style={styles.temperature}>{currentForecast?.temperature}°C</Text>
      <Image
        style={styles.image}
        source={{ uri: `https:${currentForecast?.forecastIcon}` }}
        contentFit="cover"
        transition={1000}
        alt="Image of a visual graphic representation of weather, like rainy, sunny, cloudy"
        testID="weather-icon"
      />
      <Text style={styles.humidity}>Umidade {currentForecast?.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherForecast: {
    alignItems: "center",
    width: "80%",
    height: "30%",
    backgroundColor: "gray",
    borderRadius: 5,
    marginTop: 15,
  },
  temperature: {
    fontSize: 30,
    color: "white",
  },
  city: {
    fontSize: 24,
    color: "white",
  },
  humidity: {
    fontSize: 24,
    color: "white",
  },
  image: {
    height: 50,
    width: 50,
  },
});
