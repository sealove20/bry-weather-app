import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextForecastList } from "../../resources/weather/types";
import { storeData, getData } from "./useAsyncStorage";

const mockForecast: NextForecastList = {
  forecastDate: "2024-10-29",
  forecastLocationName: "New York",
  averageTemperature: 15,
  averageHumidity: 60,
  forecastIcon: "cloudy.png",
  hourlyForecast: [
    {
      time: "12:00",
      temp_c: 15,
      condition: { text: "Cloudy", icon: "cloudy.png", code: 1003 },
      time_epoch: 0,
      temp_f: 0,
      is_day: 0,
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: "",
      pressure_mb: 0,
      pressure_in: 0,
      precip_mm: 0,
      precip_in: 0,
      snow_cm: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      windchill_c: 0,
      windchill_f: 0,
      heatindex_c: 0,
      heatindex_f: 0,
      dewpoint_c: 0,
      dewpoint_f: 0,
      will_it_rain: 0,
      chance_of_rain: 0,
      will_it_snow: 0,
      chance_of_snow: 0,
      vis_km: 0,
      vis_miles: 0,
      gust_mph: 0,
      gust_kph: 0,
      uv: 0,
    },
  ],
};

describe("Storage functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should store data successfully", async () => {
    const setItemSpy = jest.spyOn(AsyncStorage, "setItem").mockResolvedValueOnce(undefined);

    await storeData("forecastKey", mockForecast);

    expect(setItemSpy).toHaveBeenCalledWith("forecastKey", JSON.stringify(mockForecast));
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when storing data", async () => {
    const error = new Error("Storage error");
    const setItemSpy = jest.spyOn(AsyncStorage, "setItem").mockRejectedValueOnce(error);

    console.error = jest.fn(); // Mock console.error

    await storeData("forecastKey", mockForecast);

    expect(setItemSpy).toHaveBeenCalledWith("forecastKey", JSON.stringify(mockForecast));
    expect(console.error).toHaveBeenCalledWith("Failed to store data for key forecastKey:", error);
  });

  it("should retrieve data successfully", async () => {
    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValueOnce(JSON.stringify(mockForecast));

    const result = await getData("forecastKey");

    expect(getItemSpy).toHaveBeenCalledWith("forecastKey");
    expect(result).toEqual(mockForecast);
  });

  it("should return null if no data is found", async () => {
    const getItemSpy = jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce(null);

    const result = await getData("nonExistingKey");

    expect(getItemSpy).toHaveBeenCalledWith("nonExistingKey");
    expect(result).toBeNull();
  });

  it("should handle errors when retrieving data", async () => {
    const error = new Error("Retrieval error");
    const getItemSpy = jest.spyOn(AsyncStorage, "getItem").mockRejectedValueOnce(error);

    console.error = jest.fn(); // Mock console.error

    const result = await getData("forecastKey");

    expect(getItemSpy).toHaveBeenCalledWith("forecastKey");
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      "Failed to retrieve data for key forecastKey:",
      error,
    );
  });
});
