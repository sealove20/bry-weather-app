import { useEffect, useState } from "react";
import { Alert, Linking, Platform } from "react-native";

import * as IntentLauncher from "expo-intent-launcher";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const goToSettings = () => {
    if (Platform.OS == "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  };

  const askForPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "alert Message",
        "Instructions based on OS",
        [
          {
            text: "Open Settings",
            onPress: () => goToSettings(),
            style: "cancel",
          },
          { text: "DENY", onPress: () => {} },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert("This alert was dismissed by tapping outside of the alert dialog."),
        },
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setLocation(location);
  };

  const loadCurrentLocationWeather = async () => {
    setLocationLoading(true);
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      askForPermission();
      // Alert.alert("Permission to access location was denied");
      return;
    }

    // Get the current location with higher accuracy
    let location = await Location.getCurrentPositionAsync();

    if (status === "granted") {
      setLocationLoading(false);
    }
  };

  // https://github.com/expo/expo/issues/16701#issuecomment-1270111253

  //   import { getForegroundPermissionsAsync, LocationPermissionResponse } from 'expo-location';
  // import { AppState, AppStateStatus } from 'react-native';

  // ...

  // const [locationStatus, setLocationStatus] = useState<LocationPermissionResponse>();

  // useEffect(() => {
  //   (async () => {
  //     setLocationStatus(await getForegroundPermissionsAsync());
  //   })();
  // }, []);

  // const appState = useRef(AppState.currentState);
  // const [, setAppStateVisible] = useState(appState.current);

  // const handleAppStateChange = async (nextAppState: AppStateStatus) => {
  //   if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //     setLocationStatus(await getForegroundPermissionsAsync());
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  // };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return {
    longitude: location?.coords.longitude,
    latitude: location?.coords.latitude,
    askForPermission,
    locationLoading,
    loadCurrentLocationWeather,
  };
};
