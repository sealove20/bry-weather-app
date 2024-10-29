import { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";

import * as IntentLauncher from "expo-intent-launcher";
import * as Location from "expo-location";
import { UserCoordinates } from "@/resources/weather/types";

export const useLocation = () => {
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus>();

  const checkLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status);
    return status;
  };

  const goToSettings = useCallback(() => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  }, []);

  const loadCurrentLocationWeather = async (
    fetchForecastByUserCoordinates: (location: UserCoordinates) => void,
  ) => {
    let location = await Location.getCurrentPositionAsync();
    fetchForecastByUserCoordinates({
      latitude: location.coords.latitude,
      longitude: location?.coords.longitude,
    });
  };

  useEffect(() => {
    checkLocationPermission;
  }, []);

  return {
    loadCurrentLocationWeather,
    locationPermission,
    checkLocationPermission,
    goToSettings,
  };
};
