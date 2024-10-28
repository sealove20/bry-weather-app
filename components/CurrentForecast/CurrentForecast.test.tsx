import { render, screen } from "@testing-library/react-native";
import { CurrentForecast } from "./CurrentForecast";

describe("CurrentForecast", () => {
  test("renders correctly with data", () => {
    const mockData = {
      name: "London",
      temperature: 20,
      forecastIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      humidity: 70,
    };

    render(<CurrentForecast currentForecast={mockData} />);

    expect(screen.getByText("London")).toBeTruthy();
    expect(screen.getByText(`${mockData.temperature}°C`)).toBeTruthy();
    expect(screen.getByText(`Umidade ${mockData.humidity}%`)).toBeTruthy();
  });
});
