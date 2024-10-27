import { Link } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForecast } from "../hooks/useForecast";
import { Image } from "expo-image";
import { useLocation } from "../hooks/useLocation";
import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";

export default function Main() {
  const { latitude, longitude, askForPermission } = useLocation();
  const {
    nextForecasts,
    currentForecast,
    loading,
    fetchForecastByUserCoordinates,
    fetchByCityName,
  } = useForecast();
  const [locationLoading, setLocationLoading] = useState(false);
  const [text, onChangeText] = useState("");

  const loadCurrentLocationWeather = async () => {
    setLocationLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      askForPermission();
      return;
    }

    let location = await Location.getCurrentPositionAsync();

    fetchForecastByUserCoordinates({
      latitude: location.coords.latitude,
      longitude: location?.coords.longitude,
    });

    if (status === "granted") {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentLocationWeather();
  }, []);

  if (locationLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color={"red"} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Florianópolis"
        />
        <Button title="Buscar previsão" onPress={() => fetchByCityName(text)} />
      </View>
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  inputContainer: {
    width: "90%",
  },
  input: {
    height: 40,
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
});
