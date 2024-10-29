import { AutocompleList } from "@/resources/weather/types";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface AutocompleteProps {
  autocompleteNames: AutocompleList[];
  onClickInSearchedCity: (item: string) => void;
}

export const Autocomplete = ({ autocompleteNames, onClickInSearchedCity }: AutocompleteProps) => {
  return (
    <FlatList
      data={autocompleteNames}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onClickInSearchedCity(item.name)}>
          <Text style={styles.suggestion}>
            {item.name} - {item.region}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  suggestion: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
  },
});
