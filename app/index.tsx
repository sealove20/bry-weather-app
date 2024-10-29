import { useForecast } from "@/hooks/useForecast/useForecast";
import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { useForecastContext } from "@/store/searchedCity";
import { Loading } from "@/components/Loading";
import { LocationPermission } from "@/components/LocationPermission/LocationPermission";
import { Weather } from "@/components/Weather/Weather";
import { useAppStateHandler } from "@/hooks/useAppStateHandler";
import { useSearchHandlers } from "@/hooks/useSearchHandlers";

export default function Main() {
  const { loadCurrentLocationWeather, locationPermission, checkLocationPermission, goToSettings } =
    useLocation();

  const {
    nextForecasts,
    currentForecast,
    forecastLoading,
    fetchForecastByUserCoordinates,
    fetchByCityName,
    autocompleteNames,
    setForecastState,
    fetchAutocompleteCityByName,
  } = useForecast();

  const { searchedCity, setSearchedCity } = useForecastContext();

  const { onChangeText, onClickInSearchedCity } = useSearchHandlers({
    setForecastState,
    fetchAutocompleteCityByName,
    setSearchedCity,
    fetchByCityName,
  });

  const initialLoad = useCallback(() => {
    checkLocationPermission();
    if (!searchedCity) {
      loadCurrentLocationWeather(fetchForecastByUserCoordinates);
    } else {
      fetchByCityName(searchedCity);
    }
  }, [searchedCity]);

  useAppStateHandler({ initialLoad });

  useEffect(() => {
    initialLoad();
  }, []);

  if (forecastLoading) {
    return <Loading />;
  }

  if (locationPermission !== Location.PermissionStatus.GRANTED) {
    return <LocationPermission goToSettings={goToSettings} />;
  }

  return (
    <Weather
      autocompleteNames={autocompleteNames}
      currentForecast={currentForecast}
      nextForecasts={nextForecasts}
      onChangeText={onChangeText}
      onClickInSearchedCity={onClickInSearchedCity}
      searchedCity={searchedCity}
    />
  );
}
