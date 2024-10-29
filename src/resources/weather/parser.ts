import {
  AutocompleteResponse,
  CurrentForecast,
  Forecast,
  ForecastDay,
  NextForecastList,
} from "./types";

export const ForecastParser = {
  current: (forecast: Forecast): CurrentForecast => {
    const { temp_c, humidity, condition } = forecast.current;
    const { name } = forecast.location;

    return {
      temperature: Math.floor(temp_c),
      humidity: humidity,
      name: name,
      forecastIcon: condition.icon,
    };
  },
  nextForecastsList: (forecast: Forecast): NextForecastList[] => {
    const forecastLocationName = forecast.location.name;

    return forecast.forecast.forecastday
      .slice(-2)
      .map((nextForecast) =>
        ForecastParser.nextForecastsSingle(nextForecast, forecastLocationName),
      );
  },
  nextForecastsSingle: (nextForecasts: ForecastDay, locationName: string): NextForecastList => {
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
  forecastDetail: (nextForecastList: NextForecastList[]): Record<string, NextForecastList> => {
    return nextForecastList.reduce(
      (detail, forecast) => {
        detail[forecast.forecastDate] = forecast;
        return detail;
      },
      {} as Record<string, NextForecastList>,
    );
  },
  autocomplete: (autocompleteListNames: AutocompleteResponse[]) =>
    autocompleteListNames.map(({ name, id, region }) => ({ name, id, region })),
};
