import { render, screen } from "@testing-library/react-native";
import { CurrentForecast } from "./CurrentForecast";

// workaround for getting expo image uri source https://github.com/expo/expo/issues/28831
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});

describe("CurrentForecast", () => {
  it("renders correctly with data", () => {
    const mockForecast = {
      name: "London",
      temperature: 20,
      forecastIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      humidity: 70,
    };

    render(<CurrentForecast currentForecast={mockForecast} />);

    expect(screen.getByText("London")).toBeTruthy();
    expect(screen.getByText(`${mockForecast.temperature}°C`)).toBeTruthy();
    expect(screen.getByText(`Umidade ${mockForecast.humidity}%`)).toBeTruthy();
    const image = screen.getByTestId("forecast-image");
    expect(image.props.source.uri).toBe("https://cdn.weatherapi.com/weather/64x64/day/113.png");
  });
});
