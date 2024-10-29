import { ForecastParser } from "./parser";
import { Forecast, AutocompleteResponse } from "./types";

const mockForecast: Forecast = {
  location: {
    name: "New York",
    region: "New York",
    country: "USA",
    lat: 0,
    lon: 0,
    tz_id: "",
    localtime_epoch: 0,
    localtime: "",
  },
  current: {
    temp_c: 25.3,
    humidity: 70,
    is_day: 1,
    condition: { text: "Clear", icon: "icon.png", code: 1000 },
    last_updated_epoch: 0,
    last_updated: "",
    temp_f: 0,
    wind_mph: 0,
    wind_kph: 0,
    wind_degree: 0,
    wind_dir: "",
    pressure_mb: 0,
    pressure_in: 0,
    precip_mm: 0,
    precip_in: 0,
    cloud: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    windchill_c: 0,
    windchill_f: 0,
    heatindex_c: 0,
    heatindex_f: 0,
    dewpoint_c: 0,
    dewpoint_f: 0,
    vis_km: 0,
    vis_miles: 0,
    uv: 0,
    gust_mph: 0,
    gust_kph: 0,
  },
  forecast: {
    forecastday: [
      {
        date: "2024-10-30",
        day: {
          avgtemp_c: 18,
          avghumidity: 60,
          condition: { icon: "icon.png", text: "", code: 1000 },
          maxtemp_c: 0,
          maxtemp_f: 0,
          mintemp_c: 0,
          mintemp_f: 0,
          avgtemp_f: 0,
          maxwind_mph: 0,
          maxwind_kph: 0,
          totalprecip_mm: 0,
          totalprecip_in: 0,
          totalsnow_cm: 0,
          avgvis_km: 0,
          avgvis_miles: 0,
          daily_will_it_rain: 0,
          daily_chance_of_rain: 0,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          uv: 0,
        },
        hour: [],
        date_epoch: 0,
        astro: {
          sunrise: "",
          sunset: "",
          moonrise: "",
          moonset: "",
          moon_phase: "",
          moon_illumination: 0,
          is_moon_up: 0,
          is_sun_up: 0,
        },
      },
    ],
  },
};

const mockAutocompleteResponse: AutocompleteResponse[] = [
  {
    id: "1",
    name: "New York",
    region: "New York",
    country: "",
    lat: 0,
    lon: 0,
    url: "",
  },
  {
    id: "2",
    name: "San Francisco",
    region: "California",
    country: "",
    lat: 0,
    lon: 0,
    url: "",
  },
];

describe("ForecastParser", () => {
  it("should parses current forecast correctly", () => {
    const result = ForecastParser.current(mockForecast);
    expect(result).toEqual({
      temperature: 25,
      humidity: 70,
      name: "New York",
      forecastIcon: "icon.png",
    });
  });

  it("should parses next forecasts list correctly", () => {
    const result = ForecastParser.nextForecastsList(mockForecast);
    expect(result).toHaveLength(1);
    expect(result[0].forecastDate).toBe("2024-10-30");
    expect(result[0].averageTemperature).toBe(18);
  });

  it("should parses forecast details into an object", () => {
    const nextForecastList = ForecastParser.nextForecastsList(mockForecast);
    const result = ForecastParser.forecastDetail(nextForecastList);
    expect(result).toHaveProperty("2024-10-30");
  });

  it("should parses autocomplete results correctly", () => {
    const result = ForecastParser.autocomplete(mockAutocompleteResponse);
    expect(result).toEqual([
      { name: "New York", id: "1", region: "New York" },
      { name: "San Francisco", id: "2", region: "California" },
    ]);
  });
});
