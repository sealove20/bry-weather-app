import { useForecast } from "@/hooks/useForecast/useForecast";
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { useForecastContext } from "@/store/ForecastContext";
import { Loading } from "@/components/Loading";
import { LocationPermission } from "@/components/LocationPermission/LocationPermission";
import { Weather } from "@/components/Weather/Weather";
import { useAppStateHandler } from "@/hooks/useAppStateHandler/useAppStateHandler";
import { useSearchHandlers } from "@/hooks/useSearchHandlers/useSearchHandlers";
import { useLocation } from "@/hooks/useLocation/useLocation";

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

  const [permissionChecked, setPermissionChecked] = useState(false);

  const initialLoad = useCallback(async () => {
    const status = await checkLocationPermission();
    setPermissionChecked(true);

    if (status === Location.PermissionStatus.GRANTED) {
      if (!searchedCity) {
        loadCurrentLocationWeather(fetchForecastByUserCoordinates);
      } else {
        fetchByCityName(searchedCity);
      }
    }
  }, [searchedCity]);

  useAppStateHandler({ initialLoad });

  useEffect(() => {
    initialLoad();
  }, []);

  if (!permissionChecked || forecastLoading || !currentForecast) {
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
