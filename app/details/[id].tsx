import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { getData } from "@/storage/asyncStorage";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { formatTime } from "@/commons/formatters/time";
import { ForecastCard } from "@/components/ForecastCard";
import { NextForecastList } from "@/resources/weather/types";
import { colors } from "@/tokens/colors";
import { CustomText } from "@/components/CustomText";
import { HourlyForecastDetail } from "@/components/HourlyForecastInfo/HourlyForecastDetail";

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const [forecastDetails, setForecastDetails] = useState<NextForecastList>();

  const getDetails = async () => {
    const storageDetails = await getData(id as string);
    setForecastDetails(storageDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <ForecastCard
        name={forecastDetails?.forecastLocationName}
        forecastIcon={forecastDetails?.forecastIcon}
        humidity={forecastDetails?.averageHumidity}
        temperature={forecastDetails?.averageTemperature}
      />
      <HourlyForecastDetail forecastDetails={forecastDetails?.hourlyForecast} />
    </>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: "center",
    margin: 10,
    backgroundColor: colors.gray.transparent,
    padding: 15,
    borderRadius: 15,
    height: 120,
  },
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
