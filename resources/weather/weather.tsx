import { UserCoordinates } from "./types";

export const getByUserCoordinates = async (userCoordinates: UserCoordinates) => {
  const { longitude, latitude } = userCoordinates;
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`,
  );
  const json = await response.json();
  return json;
};
