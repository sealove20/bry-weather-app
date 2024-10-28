import { ForecastParser } from "@/resources/weather/parser";
import {
  AutocompleList,
  AutocompleteResponse,
  CurrentForecast,
  Forecast,
  NextForecastList,
  UserCoordinates,
} from "@/resources/weather/types";
import { getByCityName, getByUserCoordinates, getAutocomplete } from "@/resources/weather/weather";
import { storeData } from "@/storage/asyncStorage";
import { useState } from "react";

export const useForecast = () => {
  const [nextForecasts, setNextForecasts] = useState<NextForecastList[]>([]);
  const [currentForecast, setCurrentForecast] = useState<CurrentForecast>();
  const [autocompleteNames, setAutocompleteNames] = useState<AutocompleList[]>([]);

  const [loading, setLoading] = useState(false);

  const handleForecastResponse = async (response: Forecast) => {
    const forecast = ForecastParser.current(response);
    const nextForecastsList = ForecastParser.nextForecastsList(response);
    const forecastDetails = ForecastParser.forecastDetail(nextForecastsList);

    for (let forecast of nextForecastsList) {
      storeData(forecast.forecastDate, forecastDetails[forecast.forecastDate]);
    }
    setCurrentForecast(forecast);
    setNextForecasts(nextForecastsList);

    return nextForecastsList;
  };

  const fetchForecastByUserCoordinates = async (userCoordinates: UserCoordinates) => {
    setLoading(true);
    try {
      const response = await getByUserCoordinates(userCoordinates);
      await handleForecastResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCityName = async (cityName: string) => {
    if (!cityName) {
      return;
    }
    setLoading(true);
    try {
      const response = await getByCityName(cityName);
      await handleForecastResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAutocompleteCityByName = async (searchedCity: string) => {
    try {
      const response = await getAutocomplete(searchedCity);
      const autocompleteNamesList = ForecastParser.autocomplete(response);
      setAutocompleteNames(autocompleteNamesList);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    nextForecasts,
    currentForecast,
    autocompleteNames,
    setAutocompleteNames,
    forecastLoading: loading,
    fetchForecastByUserCoordinates,
    fetchByCityName,
    fetchAutocompleteCityByName,
  };
};
