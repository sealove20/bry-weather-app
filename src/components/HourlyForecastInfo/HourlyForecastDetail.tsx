import { FlatList, StyleSheet, View } from "react-native";
import { CustomText } from "../CustomText";
import { Image } from "expo-image";
import { formatTime } from "@/commons/formatters/time";
import { colors } from "@/tokens/colors";
import { Hour, NextForecastList } from "@/resources/weather/types";

interface HourlyForecastDetailProps {
  forecastDetails?: Hour[];
}

export const HourlyForecastDetail = ({ forecastDetails }: HourlyForecastDetailProps) => {
  return (
    <FlatList
      data={forecastDetails}
      horizontal
      renderItem={({ item }) => (
        <View style={styles.horizontal}>
          <CustomText size="xsm">{formatTime(item?.time)}</CustomText>
          <Image
            style={styles.image}
            source={{ uri: `https:${item?.condition.icon}` }}
            contentFit="cover"
            transition={1000}
            alt="Image of a visual graphic representation of weather, like rainy, sunny, cloudy"
            testID="forecast-detail-image"
          />
          <CustomText size="xsm">{Math.floor(item.temp_c)}°C</CustomText>
        </View>
      )}
      keyExtractor={(item) => item.time}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    alignItems: "center",
    margin: 10,
    backgroundColor: colors.gray.transparent,
    padding: 15,
    borderRadius: 15,
    height: 120,
  },
  image: {
    height: 50,
    width: 50,
  },
});
