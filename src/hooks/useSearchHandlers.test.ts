import { renderHook, act } from "@testing-library/react-hooks";
import { useSearchHandlers } from "./useSearchHandlers";

jest.mock("@/hooks/useDebounce", () => ({
  debounce: jest.fn((fn) => fn),
}));

describe("useSearchHandlers", () => {
  const mockSetForecastState = jest.fn();
  const mockFetchAutocompleteCityByName = jest.fn();
  const mockSetSearchedCity = jest.fn();
  const mockFetchByCityName = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call setSearchedCity and debouncedSearch when onChangeText is called", () => {
    const { result } = renderHook(() =>
      useSearchHandlers({
        setForecastState: mockSetForecastState,
        fetchAutocompleteCityByName: mockFetchAutocompleteCityByName,
        setSearchedCity: mockSetSearchedCity,
        fetchByCityName: mockFetchByCityName,
      }),
    );

    act(() => {
      result.current.onChangeText("New York");
    });

    expect(mockSetSearchedCity).toHaveBeenCalledWith("New York");
    expect(mockFetchAutocompleteCityByName).toHaveBeenCalledWith("New York");
  });

  it("should not call fetchAutocompleteCityByName if text is empty", () => {
    const { result } = renderHook(() =>
      useSearchHandlers({
        setForecastState: mockSetForecastState,
        fetchAutocompleteCityByName: mockFetchAutocompleteCityByName,
        setSearchedCity: mockSetSearchedCity,
        fetchByCityName: mockFetchByCityName,
      }),
    );

    act(() => {
      result.current.onChangeText("");
    });

    expect(mockSetSearchedCity).toHaveBeenCalledWith("");
    expect(mockFetchAutocompleteCityByName).not.toHaveBeenCalled();
  });

  it.only("should call setSearchedCity, fetchByCityName, and clear autocompleteNames on city click", () => {
    const { result } = renderHook(() =>
      useSearchHandlers({
        setForecastState: mockSetForecastState,
        fetchAutocompleteCityByName: mockFetchAutocompleteCityByName,
        setSearchedCity: mockSetSearchedCity,
        fetchByCityName: mockFetchByCityName,
      }),
    );

    act(() => {
      result.current.onClickInSearchedCity("Paris");
    });

    expect(mockSetSearchedCity).toHaveBeenCalledWith("Paris");
    expect(mockFetchByCityName).toHaveBeenCalledWith("Paris");

    // Check that setForecastState is called with a function that clears autocompleteNames
    expect(mockSetForecastState).toHaveBeenCalledWith(expect.any(Function));
    // Simulate the function call to verify its behavior
    const stateUpdater = mockSetForecastState.mock.calls[0][0];
    const newState = stateUpdater({ autocompleteNames: ["Old City"] });

    expect(newState.autocompleteNames).toEqual([]);
  });
});
