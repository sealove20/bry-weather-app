import { render, screen } from "@testing-library/react-native";
import { ForecastCard } from "./ForecastCard";
import { colors } from "@/tokens/colors";

// workaround for getting expo image uri source https://github.com/expo/expo/issues/28831
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});

describe("ForecastCard", () => {
  it("should renders correctly with data", () => {
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

  it("should renders 'No Image Available' when forecastIcon is not provided", () => {
    const mockForecast = {
      name: "London",
      temperature: 20,
      forecastIcon: "",
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

    expect(screen.getByText("No Image Available")).toBeTruthy();
  });

  it("should renders correct background style for cool temperatures (< 15°C)", () => {
    const mockForecast = {
      name: "Cool City",
      temperature: 10,
      forecastIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      humidity: 70,
    };

    const { getByText } = render(
      <ForecastCard
        name={mockForecast.name}
        forecastIcon={mockForecast.forecastIcon}
        humidity={mockForecast.humidity}
        temperature={mockForecast.temperature}
      />,
    );
    expect(screen.getByTestId("forecastCard").props.style[1].backgroundColor).toBe(
      colors.blue.dark,
    );
  });

  it("should renders correct background style for warm temperatures (15°C to 25°C)", () => {
    const mockForecast = {
      name: "Warm City",
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

    expect(screen.getByTestId("forecastCard").props.style[1].backgroundColor).toBe(
      colors.yellow.dark,
    );
  });

  it("should renders correct background style for hot temperatures (> 25°C)", () => {
    const mockForecast = {
      name: "Hot City",
      temperature: 30,
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

    expect(screen.getByTestId("forecastCard").props.style[1].backgroundColor).toBe(colors.red.dark);
  });
});
