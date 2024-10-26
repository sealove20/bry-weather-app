import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useForecast } from "../hooks/useForecast";

export default function Main() {
  const { forecast } = useForecast();
  return (
    <>
      <View style={styles.weatherForecast}>
        <Text style={styles.city}>Florianópolis</Text>
        <Text style={styles.temperature}>{22}°C</Text>
        <Text style={styles.humidity}>Umidade 83%</Text>
      </View>
      <View style={styles.weatherForecastMiniatureContainer}>
        <Link href="/details" asChild>
          <Pressable style={styles.weatherForecastMiniature}>
            <Text style={styles.temperature}>22°C</Text>
            <Text style={styles.humidity}>Umidade 83%</Text>
          </Pressable>
        </Link>
        <Link href="/details" asChild>
          <Pressable style={styles.weatherForecastMiniature}>
            <Text style={styles.temperature}>22°C</Text>
            <Text style={styles.humidity}>Umidade 83%</Text>
          </Pressable>
        </Link>
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
    width: 80,
    height: 200,
    backgroundColor: "gray",
    borderRadius: 5,
    marginTop: 15,
  },
  weatherForecastMiniatureContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
