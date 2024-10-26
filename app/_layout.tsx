import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultLayout() {
  return (
    <>
      <SafeAreaView style={styles.safeAreStyle}>
        <Slot />
        <StatusBar style="auto" translucent />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
