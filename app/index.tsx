import { useForecast } from "@/hooks/useForecast";
import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { useForecastContext } from "@/store/searchedCity";
import { Loading } from "@/components/Loading";
import { debounce } from "@/hooks/useDebounce";
import { LocationPermission } from "@/components/LocationPermission/LocationPermission";
import { Weather } from "@/components/Weather/Weather";
import { useAppStateHandler } from "@/hooks/useAppStateHandler";
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
    setAutocompleteNames,
    fetchAutocompleteCityByName,
  } = useForecast();

  const { searchedCity, setSearchedCity } = useForecastContext();

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

  if (forecastLoading) {
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
