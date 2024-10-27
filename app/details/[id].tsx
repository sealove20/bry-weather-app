import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { getData } from "../../storage/asyncStorage";
import { useEffect, useState } from "react";
import { Image } from "expo-image";

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const [forecastDetails, setForecastDetails] = useState();

  const getDetails = async () => {
    const storageDetails = await getData(id as string);
    setForecastDetails(storageDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <View style={styles.weatherForecast}>
      {/* <Text style={styles.city}>{forecastDetails?.forecastLocationName}</Text> */}
      <Text style={styles.temperature}>{forecastDetails?.averageTemperature}°C</Text>
      <Image
        style={styles.image}
        source={{ uri: `https:${forecastDetails?.forecastIcon}` }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.humidity}>Umidade {forecastDetails?.averageHumidity}%</Text>
    </View>
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
