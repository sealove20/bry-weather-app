export const weather = async () => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=Brasil&aqi=no`,
  );
  const json = await response.json();
  return json;
};
