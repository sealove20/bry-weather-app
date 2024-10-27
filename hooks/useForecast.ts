import { useEffect, useState } from "react";
import { getByUserCoordinates } from "../resources/weather/weather";
import { ForecastParser } from "../resources/weather/parser";
import { CurrentForecast, NextForecastList, UserCoordinates } from "../resources/weather/types";

export const useForecast = () => {
  const [nextForecasts, setNextForecasts] = useState<NextForecastList[]>([]);
  const [currentForecast, setCurrentForecast] = useState<CurrentForecast>();
  const [loading, setLoading] = useState(false);

  const fetchForecast = async (userCoordinates: UserCoordinates) => {
    setLoading(true);
    try {
      const response = await getByUserCoordinates(userCoordinates);
      const forecast = ForecastParser.current({ ...response.current, ...response.location });
      const nextForecastsList = ForecastParser.nextForecastsList(
        response.forecast.forecastday.slice(-2),
      );
      setCurrentForecast(forecast);
      setNextForecasts(nextForecastsList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    nextForecasts,
    currentForecast,
    loading,
    fetchForecast,
  };
};
