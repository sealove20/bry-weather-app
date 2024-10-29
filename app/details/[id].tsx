import { useLocalSearchParams } from "expo-router";
import { Animated } from "react-native";
import { getData } from "@/storage/asyncStorage";
import { useEffect, useState } from "react";
import { ForecastCard } from "@/components/ForecastCard";
import { NextForecastList } from "@/resources/weather/types";
import { HourlyForecastDetail } from "@/components/HourlyForecastInfo/HourlyForecastDetail";
import { Loading } from "@/components/Loading";

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const [forecastDetails, setForecastDetails] = useState<NextForecastList>();
  const [fadeAnim] = useState(new Animated.Value(0));

  const getDetails = async () => {
    const storageDetails = await getData(id as string);
    setForecastDetails(storageDetails);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!forecastDetails) {
    return <Loading />;
  }

  return (
    <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
      <>
        <ForecastCard
          name={forecastDetails?.forecastLocationName}
          forecastIcon={forecastDetails?.forecastIcon}
          humidity={forecastDetails?.averageHumidity}
          temperature={forecastDetails?.averageTemperature}
        />
        <HourlyForecastDetail forecastDetails={forecastDetails?.hourlyForecast} />
      </>
    </Animated.View>
  );
}
