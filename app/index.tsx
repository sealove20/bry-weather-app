import { Link } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForecast } from "@/hooks/useForecast";
import { Image } from "expo-image";
import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { ForecastCard } from "@/components/ForecastCard/ForecastCard";
import { colors } from "@/tokens/colors";
import { NextForecast } from "@/components/NextForecast/NextForecast";
import { CustomText } from "@/components/CustomText";
import { useForecastContext } from "@/store/searchedCity";
import { Loading } from "@/components/Loading/Loading";
import { debounce } from "@/hooks/useDebounce";
export default function Main() {
  const { latitude, longitude, askForPermission } = useLocation();
  const {
    nextForecasts,
    currentForecast,
    forecastLoading,
    fetchForecastByUserCoordinates,
    fetchByCityName,
    autocompleteNames,
    setAutocompleteNames,
    fetchAutocompleteCityByName,
  } = useForecast();
  const [locationLoading, setLocationLoading] = useState(false);
  const { searchedCity, setSearchedCity } = useForecastContext();

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

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchAutocompleteCityByName(query);
    }, 500),
    [],
  );

  const onChangeText = (text: string) => {
    setSearchedCity(text);
    debouncedSearch(text);
  };

  const onClickInSearchedCity = (cityName: string) => {
    setSearchedCity(cityName);
    fetchByCityName(cityName);
    setAutocompleteNames([]);
  };

  useEffect(() => {
    if (!searchedCity) {
      loadCurrentLocationWeather();
    } else {
      fetchByCityName(searchedCity);
    }
  }, []);

  if (locationLoading || forecastLoading) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={searchedCity}
          placeholder="Nome da cidade"
        />
        {autocompleteNames.length > 0 && (
          <FlatList
            data={autocompleteNames}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onClickInSearchedCity(item.name)}>
                <Text style={styles.suggestion}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <ForecastCard
        name={currentForecast?.name}
        forecastIcon={currentForecast?.forecastIcon}
        humidity={currentForecast?.humidity}
        temperature={currentForecast?.temperature}
      />
      <CustomText size="sm" style={styles.nextForecastTitle}>
        Próximos dias
      </CustomText>
      <View style={styles.weatherForecastMiniatureContainer}>
        {nextForecasts?.map((forecast) => (
          <Link href={`/details/${forecast.forecastDate}`} asChild>
            <Pressable style={styles.weatherForecastMiniature} key={forecast.forecastDate}>
              <NextForecast nextForecast={forecast} />
            </Pressable>
          </Link>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  suggestion: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
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
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  nextForecastTitle: {
    marginTop: 15,
  },
});
