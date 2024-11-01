import { render, screen } from "@testing-library/react-native";
import { NextForecast } from "./NextForecast";
import { NextForecastList } from "@/resources/weather/types";

// workaround for getting expo image uri source https://github.com/expo/expo/issues/28831
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});

const mockForecast: NextForecastList = {
  forecastLocationName: "London",
  averageTemperature: 25,
  averageHumidity: 60,
  forecastIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
  forecastDate: "2024-10-28",
  hourlyForecast: [],
};

describe("NextForecast Component", () => {
  it("should renders correctly with data", () => {
    render(<NextForecast nextForecast={mockForecast} />);

    expect(screen.getByText("25°C")).toBeTruthy();
    expect(screen.getByText("Umidade 60%")).toBeTruthy();
    expect(screen.getByText("28/10")).toBeTruthy();
    const image = screen.getByTestId("next-forecast-image");
    expect(image.props.source.uri).toBe(`https:${mockForecast.forecastIcon}`);
  });
});
