import { useEffect, useState } from "react";
import { weather } from "../resources/weather";

export const useForecast = () => {
  const [forecast, setForecast] = useState();

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await weather();
        setForecast(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchForecast();
  }, []);

  return {
    forecast,
  };
};
