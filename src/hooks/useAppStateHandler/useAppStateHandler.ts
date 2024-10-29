import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as Location from "expo-location";

interface UseAppStateHandlerProps {
  initialLoad: () => void;
}

export const useAppStateHandler = ({ initialLoad }: UseAppStateHandlerProps) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          initialLoad();
          return;
        }
      } else if (nextAppState === "background") {
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState, initialLoad]);

  return { appState };
};
