import { ForecastParser } from "@/resources/weather/parser";
import {
  AutocompleList,
  CurrentForecast,
  Forecast,
  NextForecastList,
  UserCoordinates,
} from "@/resources/weather/types";
import { getByCityName, getByUserCoordinates, getAutocomplete } from "@/resources/weather/weather";
import { storeData } from "@/hooks/useAsyncStorage/useAsyncStorage";
import { useCallback, useState } from "react";

export interface UseForecastState {
  currentForecast?: CurrentForecast;
  nextForecasts: NextForecastList[];
  autocompleteNames: AutocompleList[];
}

interface FetchState {
  loading: boolean;
  error?: string | null;
}

export const useForecast = () => {
  const [forecastState, setForecastState] = useState<UseForecastState>({
    nextForecasts: [],
    autocompleteNames: [],
  });

  const [fetchState, setFetchState] = useState<FetchState>({ loading: false });

  const setLoading = (isLoading: boolean) =>
    setFetchState((prev) => ({ ...prev, loading: isLoading }));

  const handleForecastResponse = async (response: Forecast) => {
    const forecast = ForecastParser.current(response);
    const nextForecastsList = ForecastParser.nextForecastsList(response);
    const forecastDetails = ForecastParser.forecastDetail(nextForecastsList);

    await Promise.all(
      nextForecastsList.map((forecast) =>
        storeData(forecast.forecastDate, forecastDetails[forecast.forecastDate]),
      ),
    );

    setForecastState((prev) => ({
      ...prev,
      currentForecast: forecast,
      nextForecasts: nextForecastsList,
    }));

    return nextForecastsList;
  };

  const fetchForecast = useCallback(async (fetchFunction: () => Promise<Forecast>) => {
    setLoading(true);
    try {
      const response = await fetchFunction();
      await handleForecastResponse(response);
    } catch (error) {
      console.error("Forecast Fetch Error:", error);
      setFetchState((prev) => ({ ...prev }));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchForecastByUserCoordinates = useCallback(
    async (userCoordinates: UserCoordinates) => {
      await fetchForecast(() => getByUserCoordinates(userCoordinates));
    },
    [fetchForecast],
  );

  const fetchByCityName = useCallback(
    async (cityName: string) => {
      if (cityName) {
        await fetchForecast(() => getByCityName(cityName));
      }
    },
    [fetchForecast],
  );

  const fetchAutocompleteCityByName = useCallback(async (searchedCity: string) => {
    try {
      const response = await getAutocomplete(searchedCity);
      const autocompleteNamesList = ForecastParser.autocomplete(response);
      setForecastState((prev) => ({
        ...prev,
        autocompleteNames: autocompleteNamesList,
      }));
    } catch (error) {
      console.error("Autocomplete Fetch Error:", error);
      setFetchState((prev) => ({ ...prev }));
    }
  }, []);

  return {
    ...forecastState,
    setForecastState,
    forecastLoading: fetchState.loading,
    fetchForecastByUserCoordinates,
    fetchByCityName,
    fetchAutocompleteCityByName,
  };
};
