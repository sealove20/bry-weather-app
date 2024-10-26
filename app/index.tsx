import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useForecast } from "../hooks/useForecast";
import { Image } from "expo-image";

export default function Main() {
  const { nextForecasts, currentForecast, loading } = useForecast();

  if (loading) {
    return;
  }

  return (
    <>
      <View style={styles.weatherForecast}>
        <Text style={styles.city}>{currentForecast?.name}</Text>
        <Text style={styles.temperature}>{currentForecast?.temperature}°C</Text>
        <Image
          style={styles.image}
          source={{ uri: `https:${currentForecast?.forecastIcon}` }}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.humidity}>Umidade {currentForecast?.humidity}%</Text>
      </View>
      <Text>Próximos dias</Text>
      <View style={styles.weatherForecastMiniatureContainer}>
        {nextForecasts?.map((forecast) => (
          <Link href="/details" asChild>
            <Pressable style={styles.weatherForecastMiniature}>
              <Text style={styles.temperature}>{forecast?.averageTemperature}°C</Text>
              <Image
                style={styles.image}
                source={{ uri: `https:${forecast?.forecastIcon}` }}
                contentFit="cover"
                transition={500}
              />
              <Text style={styles.humidity}>Umidade {forecast?.averageHumidity}%</Text>
              <Text style={styles.humidity}>{forecast?.forecastDate}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
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
  weatherForecastMiniature: {
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: "gray",
    borderRadius: 5,
    marginTop: 15,
  },
  weatherForecastMiniatureContainer: {
    gap: 15,
  },
  image: {
    height: 50,
    width: 50,
  },
});
