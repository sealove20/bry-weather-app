import { renderHook, act } from "@testing-library/react-hooks";
import { AppState } from "react-native";
import * as Location from "expo-location";
import { useAppStateHandler } from "./useAppStateHandler";

jest.mock("react-native", () => ({
  AppState: {
    currentState: "background",
    addEventListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}));

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
}));

describe("useAppStateHandler", () => {
  const mockInitialLoad = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with the current app state", () => {
    const { result } = renderHook(() => useAppStateHandler({ initialLoad: mockInitialLoad }));

    expect(result.current.appState).toBe("background");
  });

  it("should call initialLoad when the app comes to the foreground with permission granted", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "granted",
    });

    renderHook(() => useAppStateHandler({ initialLoad: mockInitialLoad }));
    const appStateChangeHandler = (AppState.addEventListener as jest.Mock).mock.calls[0][1];

    await act(async () => {
      await appStateChangeHandler("active");
    });

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockInitialLoad).toHaveBeenCalledTimes(1);
  });

  it("should not call initialLoad if permission is not granted", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: "inactive",
    });

    renderHook(() => useAppStateHandler({ initialLoad: mockInitialLoad }));

    const appStateChangeHandler = (AppState.addEventListener as jest.Mock).mock.calls[0][1];

    await act(async () => {
      await appStateChangeHandler("active");
    });

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockInitialLoad).not.toHaveBeenCalled();
  });

  it("should update the app state when it changes", async () => {
    const { result } = renderHook(() => useAppStateHandler({ initialLoad: mockInitialLoad }));

    const appStateChangeHandler = (AppState.addEventListener as jest.Mock).mock.calls[0][1];

    await act(async () => {
      await appStateChangeHandler("background");
    });

    expect(result.current.appState).toBe("background");
  });

  it("should clean up the event listener on unmount", () => {
    const removeMock = jest.fn();
    (AppState.addEventListener as jest.Mock).mockReturnValue({ remove: removeMock });

    const { unmount } = renderHook(() => useAppStateHandler({ initialLoad: mockInitialLoad }));

    unmount();
    expect(removeMock).toHaveBeenCalledTimes(1);
  });
});
