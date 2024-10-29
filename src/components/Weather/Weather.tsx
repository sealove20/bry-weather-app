import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Autocomplete } from "../Autocomplete";
import { ForecastCard } from "../ForecastCard";
import { CustomText } from "../CustomText";
import { Link } from "expo-router";
import { NextForecast } from "../NextForecast";
import { colors } from "@/tokens/colors";
import { AutocompleList, CurrentForecast, NextForecastList } from "@/resources/weather/types";

interface WeatherProps {
  searchedCity: string;
  onChangeText: (text: string) => void;
  autocompleteNames: AutocompleList[];
  onClickInSearchedCity: (cityName: string) => void;
  currentForecast?: CurrentForecast;
  nextForecasts: NextForecastList[];
}

export const Weather = ({
  searchedCity,
  onChangeText,
  autocompleteNames,
  onClickInSearchedCity,
  currentForecast,
  nextForecasts,
}: WeatherProps) => (
  <>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={searchedCity}
        placeholder="Nome da cidade"
      />
      {autocompleteNames.length > 0 && (
        <Autocomplete
          autocompleteNames={autocompleteNames}
          onClickInSearchedCity={onClickInSearchedCity}
        />
      )}
    </View>
    <ForecastCard
      name={currentForecast?.name}
      forecastIcon={currentForecast?.forecastIcon}
      humidity={currentForecast?.humidity}
      temperature={currentForecast?.temperature}
    />
    <CustomText size="sm" style={styles.nextForecastTitle}>
      Próximos dias
    </CustomText>
    <View style={styles.weatherForecastMiniatureContainer}>
      {nextForecasts?.map((forecast) => (
        <Link href={`/details/${forecast.forecastDate}`} asChild key={forecast.forecastDate}>
          <Pressable style={styles.weatherForecastMiniature} testID="next-forecast-button">
            <NextForecast nextForecast={forecast} />
          </Pressable>
        </Link>
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
  },
  input: {
    height: 40,
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  nextForecastTitle: {
    marginTop: 15,
  },
  weatherForecastMiniatureContainer: {
    alignItems: "center",
    width: "90%",
    gap: 15,
  },
  weatherForecastMiniature: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 100,
    backgroundColor: colors.gray.transparent,
    borderRadius: 5,
    marginTop: 15,
  },
});
