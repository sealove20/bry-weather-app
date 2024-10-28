import { Link } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForecast } from "../hooks/useForecast";
import { Image } from "expo-image";
import { useLocation } from "../hooks/useLocation";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ForecastCard } from "../components/ForecastCard/ForecastCard";
import { colors } from "../tokens/colors";
import { NextForecast } from "../components/NextForecast/NextForecast";

export default function Main() {
  const { latitude, longitude, askForPermission } = useLocation();
  const {
    nextForecasts,
    currentForecast,
    forecastLoading,
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
    if (!currentForecast) {
      loadCurrentLocationWeather();
    }
  }, []);

  if (locationLoading || forecastLoading) {
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
      <ForecastCard
        name={currentForecast?.name}
        forecastIcon={currentForecast?.forecastIcon}
        humidity={currentForecast?.humidity}
        temperature={currentForecast?.temperature}
      />
      <Text style={styles.nextForecastTitle}>Próximos dias</Text>
      <View style={styles.weatherForecastMiniatureContainer}>
        {nextForecasts?.map((forecast) => (
          <Link href={`/details/${forecast.forecastDate}`} asChild>
            <Pressable style={styles.weatherForecastMiniature}>
              <NextForecast nextForecast={forecast} key={forecast.forecastDate} />
            </Pressable>
          </Link>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherForecast: {
    alignItems: "center",
    width: "90%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 100,
    backgroundColor: colors.gray.transparent,
    borderRadius: 5,
    marginTop: 15,
  },
  weatherForecastMiniatureContainer: {
    alignItems: "center",
    width: "90%",
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
    backgroundColor: "#fff",
  },
  nextForecastTitle: {
    fontSize: 18,
    color: colors.white,
    marginTop: 15,
  },
});
