import { Link } from "expo-router";
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
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
import { ForecastCard } from "@/components/ForecastCard";
import { colors } from "@/tokens/colors";
import { NextForecast } from "@/components/NextForecast";
import { CustomText } from "@/components/CustomText";
import { useForecastContext } from "@/store/searchedCity";
import { Loading } from "@/components/Loading";
import { debounce } from "@/hooks/useDebounce";
import { Autocomplete } from "@/components/Autocomplete";
import { LocationPermission } from "@/components/LocationPermission/LocationPermission";
import { Weather } from "@/components/Weather/Weather";
import { useAppStateHandler } from "@/hooks/useAppStateHandler";
export default function Main() {
  const {
    latitude,
    longitude,
    loadCurrentLocationWeather,
    locationPermission,
    checkLocationPermission,
    goToSettings,
  } = useLocation();
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

  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchAutocompleteCityByName(query);
    }, 500),
    [],
  );

  const onChangeText = useCallback(
    (text: string) => {
      setSearchedCity(text);
      if (text) {
        debouncedSearch(text);
      }
    },
    [setSearchedCity],
  );

  const onClickInSearchedCity = useCallback((cityName: string) => {
    setSearchedCity(cityName);
    fetchByCityName(cityName);
    setAutocompleteNames([]);
  }, []);

  const initialLoad = () => {
    checkLocationPermission();
    if (!searchedCity) {
      loadCurrentLocationWeather(fetchForecastByUserCoordinates);
    } else {
      fetchByCityName(searchedCity);
    }
  };

  useAppStateHandler({ initialLoad });

  useEffect(() => {
    initialLoad();
  }, []);

  if (locationLoading || forecastLoading) {
    return <Loading />;
  }

  return (
    <>
      {locationPermission !== Location.PermissionStatus.GRANTED ? (
        <LocationPermission goToSettings={goToSettings} />
      ) : (
        <>
          <Weather
            autocompleteNames={autocompleteNames}
            currentForecast={currentForecast}
            nextForecasts={nextForecasts}
            onChangeText={onChangeText}
            onClickInSearchedCity={onClickInSearchedCity}
            searchedCity={searchedCity}
          />
        </>
      )}
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
  permissionCard: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.yellow.dark,
    width: "100%",
    height: 250,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  permissionCardButton: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 15,
    marginTop: 10,
    padding: 7,
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
