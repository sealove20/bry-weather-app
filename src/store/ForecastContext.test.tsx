import { renderHook, act } from "@testing-library/react-hooks";
import { render, screen } from "@testing-library/react-native";
import { ForecastProvider, useForecastContext } from "./ForecastContext";
import { Text } from "react-native";

describe("ForecastContext", () => {
  it("should provide the correct default values", () => {
    const { result } = renderHook(() => useForecastContext(), {
      wrapper: ForecastProvider,
    });

    expect(result.current.searchedCity).toBe("");
  });

  it("should update searchedCity when setSearchedCity is called", () => {
    const { result } = renderHook(() => useForecastContext(), {
      wrapper: ForecastProvider,
    });

    act(() => {
      result.current.setSearchedCity("New York");
    });

    expect(result.current.searchedCity).toBe("New York");
  });

  it("should throw an error when used outside of ForecastProvider", () => {
    const { result } = renderHook(() => useForecastContext());

    expect(result.error).toEqual(
      new Error("useForecastContext must be used within a ForecastProvider"),
    );
  });

  it("should render children correctly inside ForecastProvider", () => {
    render(
      <ForecastProvider>
        <Text>Test Child</Text>
      </ForecastProvider>,
    );

    expect(screen.getByText("Test Child")).toBeTruthy();
  });
});
