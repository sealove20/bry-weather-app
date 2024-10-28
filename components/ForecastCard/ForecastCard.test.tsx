import { render, screen } from "@testing-library/react-native";
import { ForecastCard } from "./ForecastCard";

// workaround for getting expo image uri source https://github.com/expo/expo/issues/28831
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});

describe("ForecastCard", () => {
  it("renders correctly with data", () => {
    const mockForecast = {
      name: "London",
      temperature: 20,
      forecastIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      humidity: 70,
    };

    render(
      <ForecastCard
        name={mockForecast.name}
        forecastIcon={mockForecast.forecastIcon}
        humidity={mockForecast.humidity}
        temperature={mockForecast.temperature}
      />,
    );

    expect(screen.getByText("London")).toBeTruthy();
    expect(screen.getByText(`${mockForecast.temperature}°C`)).toBeTruthy();
    expect(screen.getByText(`Umidade ${mockForecast.humidity}%`)).toBeTruthy();
    const image = screen.getByTestId("forecast-image");
    expect(image.props.source.uri).toBe("https://cdn.weatherapi.com/weather/64x64/day/113.png");
  });
});
