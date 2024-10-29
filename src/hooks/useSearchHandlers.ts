import { useCallback } from "react";
import { debounce } from "@/hooks/useDebounce";

export const useSearchHandlers = ({
  setAutocompleteNames,
  fetchAutocompleteCityByName,
  setSearchedCity,
  fetchByCityName,
}: {
  setAutocompleteNames: (names: any[]) => void;
  fetchAutocompleteCityByName: (query: string) => void;
  setSearchedCity: (city: string) => void;
  fetchByCityName: (city: string) => void;
}) => {
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
      setAutocompleteNames([]);
    },
    [setSearchedCity, fetchByCityName, setAutocompleteNames],
  );

  return { onChangeText, onClickInSearchedCity };
};
