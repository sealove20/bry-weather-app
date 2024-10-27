import { CurrentForecast, Forecast, NextForecast } from "./types";

export const ForecastParser = {
  current: (forecast: Forecast): CurrentForecast => {
    const { temp_c: temperature, humidity, name, condition } = forecast;

    return {
      temperature: Math.floor(temperature),
      humidity,
      name,
      forecastIcon: condition.icon,
    };
  },
  nextForecastsList: (nextForecasts: NextForecast[]) => {
    return nextForecasts.map(ForecastParser.nextForecastsSingle);
  },
  nextForecastsSingle: (nextForecasts: NextForecast) => {
    const { day, date, hour } = nextForecasts;

    return {
      forecastDate: date,
      averageTemperature: Math.floor(day.avgtemp_c),
      forecastIcon: day.condition.icon,
      averageHumidity: day.avghumidity,
      hourlyForecast: hour,
    };
  },
};
