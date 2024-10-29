import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} size="large" color={"red"} testID="activity-indicator" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
