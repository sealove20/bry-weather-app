import { AutocompleteResponse, Forecast, UserCoordinates } from "./types";

const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("API key is missing. Please set EXPO_PUBLIC_API_KEY.");
}

export const getByUserCoordinates = async (userCoordinates: UserCoordinates): Promise<Forecast> => {
  const { longitude, latitude } = userCoordinates;
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`,
  );
  const json = await response.json();
  return json;
};

export const getByCityName = async (city: string): Promise<Forecast> => {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`,
  );
  const json = await response.json();
  return json;
};

export const getAutocomplete = async (searchedCity: string): Promise<AutocompleteResponse[]> => {
  const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${searchedCity}`);
  const json = await response.json();
  return json;
};
