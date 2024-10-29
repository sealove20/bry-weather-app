import { render, screen } from "@testing-library/react-native";
import { HourlyForecastDetail } from "./HourlyForecastDetail";
import { Hour } from "@/resources/weather/types";

describe("HourlyForecastDetail", () => {
  const mockData: Hour[] = [
    {
      time_epoch: 1730084400,
      time: "2024-10-28 15:00",
      temp_c: 22.3,
      temp_f: 63.7,
      is_day: 0,
      condition: { icon: "/images/rain.png", text: "example", code: 123 },

      wind_mph: 3.4,
      wind_kph: 5.4,
      wind_degree: 336,
      wind_dir: "NNW",
      pressure_mb: 1021.0,
      pressure_in: 30.15,
      precip_mm: 0.0,
      precip_in: 0.0,
      snow_cm: 0.0,
      humidity: 75,
      cloud: 41,
      feelslike_c: 17.6,
      feelslike_f: 63.7,
      windchill_c: 17.6,
      windchill_f: 63.7,
      heatindex_c: 17.6,
      heatindex_f: 63.7,
      dewpoint_c: 13.2,
      dewpoint_f: 55.8,
      will_it_rain: 0,
      chance_of_rain: 0,
      will_it_snow: 0,
      chance_of_snow: 0,
      vis_km: 10.0,
      vis_miles: 6.0,
      gust_mph: 5.2,
      gust_kph: 8.4,
      uv: 0,
    },
    {
      time_epoch: 1730084400,
      time: "2024-10-28 16:00",
      temp_c: 23.1,
      temp_f: 63.7,
      is_day: 0,
      condition: { icon: "/images/cloud.png", text: "example", code: 321 },

      wind_mph: 3.4,
      wind_kph: 5.4,
      wind_degree: 336,
      wind_dir: "NNW",
      pressure_mb: 1021.0,
      pressure_in: 30.15,
      precip_mm: 0.0,
      precip_in: 0.0,
      snow_cm: 0.0,
      humidity: 75,
      cloud: 41,
      feelslike_c: 17.6,
      feelslike_f: 63.7,
      windchill_c: 17.6,
      windchill_f: 63.7,
      heatindex_c: 17.6,
      heatindex_f: 63.7,
      dewpoint_c: 13.2,
      dewpoint_f: 55.8,
      will_it_rain: 0,
      chance_of_rain: 0,
      will_it_snow: 0,
      chance_of_snow: 0,
      vis_km: 10.0,
      vis_miles: 6.0,
      gust_mph: 5.2,
      gust_kph: 8.4,
      uv: 0,
    },
  ];

  it("should renders each hourly forecast item correctly", () => {
    render(<HourlyForecastDetail forecastDetails={mockData} />);

    expect(screen.getByText("15:00")).toBeTruthy();
    expect(screen.getByText("16:00")).toBeTruthy();
    expect(screen.getByText("22°C")).toBeTruthy();
    expect(screen.getByText("23°C")).toBeTruthy();
    expect(screen.getAllByTestId("forecast-detail-image").length).toBe(mockData.length);
  });

  it("renders without errors if `forecastDetails` is undefined", () => {
    render(<HourlyForecastDetail />);

    expect(screen.queryByText("15:00")).toBeNull();
    expect(screen.queryAllByTestId("forecast-detail-image").length).toBe(0);
  });

  it("displays the formatted time and temperature correctly", () => {
    const { getByText } = render(<HourlyForecastDetail forecastDetails={mockData} />);

    expect(getByText("15:00")).toBeTruthy();
    expect(getByText("22°C")).toBeTruthy();
  });
});
