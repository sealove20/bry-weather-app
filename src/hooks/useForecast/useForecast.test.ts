import { renderHook, act } from "@testing-library/react-hooks";
import { useForecast } from "./useForecast";
import { getByCityName, getByUserCoordinates, getAutocomplete } from "@/resources/weather/weather";
import { storeData } from "@/hooks/useAsyncStorage/useAsyncStorage";
import { mockForecastResponse, mockNextForecastResponse } from "./useForecast.mock";

jest.mock("@/resources/weather/weather", () => ({
  getByCityName: jest.fn(),
  getByUserCoordinates: jest.fn(),
  getAutocomplete: jest.fn(),
}));

jest.mock("@/hooks/useAsyncStorage", () => ({
  storeData: jest.fn(),
}));

describe("useForecast", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation((message) => {
      if (!message.includes("ProgressBarAndroid has been extracted")) {
        console.warn(message);
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch forecast by city name and update state", async () => {
    (getByCityName as jest.Mock).mockResolvedValue(mockForecastResponse);

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.fetchByCityName("New York");
    });

    expect(getByCityName).toHaveBeenCalledWith("New York");
    expect(result.current.currentForecast?.name).toBe("New York");
    expect(result.current.forecastLoading).toBe(false);
  });

  it("should fetch forecast by user coordinates and update state", async () => {
    (getByUserCoordinates as jest.Mock).mockResolvedValue(mockForecastResponse);

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.fetchForecastByUserCoordinates({
        latitude: 40.7128,
        longitude: -74.006,
      });
    });

    expect(getByUserCoordinates).toHaveBeenCalledWith({ latitude: 40.7128, longitude: -74.006 });
    expect(result.current.currentForecast?.name).toBe("New York");
    expect(result.current.forecastLoading).toBe(false);
  });

  it("should fetch autocomplete results and update state", async () => {
    const mockAutocompleteResponse = [{ id: "1", name: "New York" }];
    (getAutocomplete as jest.Mock).mockResolvedValue(mockAutocompleteResponse);

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.fetchAutocompleteCityByName("New");
    });

    expect(getAutocomplete).toHaveBeenCalledWith("New");
    expect(result.current.autocompleteNames).toEqual(mockAutocompleteResponse);
  });

  it("should store forecast data in AsyncStorage", async () => {
    (getByCityName as jest.Mock).mockResolvedValue(mockForecastResponse);

    const { result } = renderHook(() => useForecast());

    await act(async () => {
      await result.current.fetchByCityName("New York");
    });

    expect(storeData).toHaveBeenCalledTimes(1);
    expect(storeData).toHaveBeenCalledWith("2024-10-29", mockNextForecastResponse);
  });
});
