import { useEffect, useState } from "react";
import { weather } from "../resources/weather/weather";
import { ForecastParser } from "../resources/weather/parser";
import { CurrentForecast, NextForecastList } from "../resources/weather/types";

export const useForecast = () => {
  const [nextForecasts, setNextForecasts] = useState<NextForecastList[]>([]);
  const [currentForecast, setCurrentForecast] = useState<CurrentForecast>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await weather();
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

    fetchForecast();
  }, []);

  return {
    nextForecasts,
    currentForecast,
    loading,
  };
};
