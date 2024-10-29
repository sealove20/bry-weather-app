import { Dispatch, SetStateAction, useCallback } from "react";
import { debounce } from "@/hooks/useDebounce";
import { UseForecastState } from "./useForecast";

interface UseSearchHandlersProps {
  setForecastState: Dispatch<SetStateAction<UseForecastState>>;
  fetchAutocompleteCityByName: (query: string) => void;
  setSearchedCity: (city: string) => void;
  fetchByCityName: (city: string) => void;
}

export const useSearchHandlers = ({
  setForecastState,
  fetchAutocompleteCityByName,
  setSearchedCity,
  fetchByCityName,
}: UseSearchHandlersProps) => {
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchAutocompleteCityByName(query);
    }, 500),
    [fetchAutocompleteCityByName],
  );

  const onChangeText = useCallback(
    (text: string) => {
      setSearchedCity(text);
      if (text) {
        debouncedSearch(text);
      }
    },
    [setSearchedCity, debouncedSearch],
  );

  const onClickInSearchedCity = useCallback(
    (cityName: string) => {
      setSearchedCity(cityName);
      fetchByCityName(cityName);
      setForecastState((prev) => ({
        ...prev,
        autocompleteNames: [],
      }));
    },
    [setSearchedCity, fetchByCityName],
  );

  return { onChangeText, onClickInSearchedCity };
};
