import {
  AutocompleteResponse,
  CurrentForecast,
  Forecast,
  ForecastDay,
  NextForecastList,
} from "./types";

export const ForecastParser = {
  current: (forecast: Forecast): CurrentForecast => {
    const { current, location } = forecast;

    return {
      temperature: Math.floor(current.temp_c),
      humidity: current.humidity,
      name: location.name,
      forecastIcon: current.condition.icon,
    };
  },
  nextForecastsList: (forecast: Forecast) => {
    const forecastLocationName = forecast.location.name;

    const nextForecasts = forecast.forecast.forecastday.slice(-2);
    return nextForecasts.map((nextForecast) =>
      ForecastParser.nextForecastsSingle(nextForecast, forecastLocationName),
    );
  },
  nextForecastsSingle: (nextForecasts: ForecastDay, locationName: string) => {
    const { day, date, hour } = nextForecasts;

    return {
      forecastLocationName: locationName,
      forecastDate: date,
      averageTemperature: Math.floor(day.avgtemp_c),
      forecastIcon: day.condition.icon,
      averageHumidity: day.avghumidity,
      hourlyForecast: hour,
    };
  },
  forecastDetail: (nextForecastList: NextForecastList[]) => {
    const forecastDetail: { [key: string]: NextForecastList } = {};
    nextForecastList.forEach((forecast) => {
      forecastDetail[forecast.forecastDate] = forecast;
    });

    return forecastDetail;
  },
  autocomplete: (autocompleteListNames: AutocompleteResponse[]) => {
    const aucompleteNames = autocompleteListNames.map((location) => ({
      name: location.name,
      id: location.id,
    }));
    return aucompleteNames;
  },
};
