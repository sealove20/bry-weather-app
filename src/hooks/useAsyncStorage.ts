import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextForecastList } from "../resources/weather/types";

export const storeData = async (key: string, nextForecasts: NextForecastList) => {
  try {
    const jsonValue = JSON.stringify(nextForecasts);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Failed to store data for key ${key}:`, error);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Failed to retrieve data for key ${key}:`, error);
  }
};
