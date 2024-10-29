import { render, fireEvent, screen } from "@testing-library/react-native";
import { Weather } from "./Weather";
import { AutocompleList, CurrentForecast, NextForecastList } from "@/resources/weather/types";

describe("Weather Component", () => {
  const mockOnChangeText = jest.fn();
  const mockOnClickInSearchedCity = jest.fn();
  const mockAutocompleteNames: AutocompleList[] = [
    {
      id: "1",
      name: "Florianopolis",
      region: "Santa Catarina",
    },
    {
      id: "2",
      name: "Sao Paulo",
      region: "Sao Paulo",
    },
  ];
  const mockNextForecasts: NextForecastList[] = [
    {
      forecastLocationName: "London",
      averageTemperature: 25,
      averageHumidity: 60,
      forecastIcon: "/cdn.weatherapi.com/weather/64x64/day/113.png",
      forecastDate: "2024-10-28",
      hourlyForecast: [],
    },
    {
      forecastLocationName: "Paris",
      averageTemperature: 13,
      averageHumidity: 20,
      forecastIcon: "/cdn.weatherapi.com/weather/64x64/day/114.png",
      forecastDate: "2024-10-29",
      hourlyForecast: [],
    },
  ];
  const mockCurrentForecast: CurrentForecast = {
    name: "Rio de Janeiro",
    forecastIcon: "//icon_url",
    humidity: 78,
    temperature: 35,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should renders correctly with provided props", () => {
    render(
      <Weather
        searchedCity="Rio de Janeiro"
        onChangeText={mockOnChangeText}
        autocompleteNames={[]}
        onClickInSearchedCity={mockOnClickInSearchedCity}
        currentForecast={mockCurrentForecast}
        nextForecasts={mockNextForecasts}
      />,
    );

    expect(screen.getByText("Rio de Janeiro")).toBeTruthy();
    const image = screen.getByTestId("forecast-image");
    expect(image.props.source[0].uri).toBe(`https:${mockCurrentForecast.forecastIcon}`);
    expect(screen.getByText("Umidade 60%")).toBeTruthy();
    expect(screen.getByText("35°C")).toBeTruthy();
    expect(screen.getByText("Próximos dias")).toBeTruthy();
  });

  it("should handles text input change", () => {
    render(
      <Weather
        searchedCity="Rio de Janeiro"
        onChangeText={mockOnChangeText}
        autocompleteNames={[]}
        onClickInSearchedCity={mockOnClickInSearchedCity}
        currentForecast={mockCurrentForecast}
        nextForecasts={mockNextForecasts}
      />,
    );

    const input = screen.getByPlaceholderText("Nome da cidade");
    fireEvent.changeText(input, "Sao Paulo");

    expect(mockOnChangeText).toHaveBeenCalledWith("Sao Paulo");
  });

  it("should renders autocomplete suggestions when provided", () => {
    render(
      <Weather
        searchedCity="Sao Paulo"
        onChangeText={mockOnChangeText}
        autocompleteNames={mockAutocompleteNames}
        onClickInSearchedCity={mockOnClickInSearchedCity}
        currentForecast={mockCurrentForecast}
        nextForecasts={mockNextForecasts}
      />,
    );

    expect(screen.getByText("Florianopolis - Santa Catarina")).toBeTruthy();
    expect(screen.getByText("Sao Paulo - Sao Paulo")).toBeTruthy();
  });

  it("should triggers onClickInSearchedCity when a suggestion is clicked", () => {
    render(
      <Weather
        searchedCity="Sao Paulo"
        onChangeText={mockOnChangeText}
        autocompleteNames={mockAutocompleteNames}
        onClickInSearchedCity={mockOnClickInSearchedCity}
        currentForecast={mockCurrentForecast}
        nextForecasts={mockNextForecasts}
      />,
    );

    fireEvent.press(screen.getByText("Florianopolis - Santa Catarina"));
    expect(mockOnClickInSearchedCity).toHaveBeenCalledWith("Florianopolis");
  });

  it("should renders the next forecasts correctly", () => {
    render(
      <Weather
        searchedCity="Rio de Janeiro"
        onChangeText={mockOnChangeText}
        autocompleteNames={[]}
        onClickInSearchedCity={mockOnClickInSearchedCity}
        currentForecast={mockCurrentForecast}
        nextForecasts={mockNextForecasts}
      />,
    );

    expect(screen.getByText("28/10")).toBeTruthy();
    expect(screen.getByText("29/10")).toBeTruthy();
  });
});
