import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/tokens/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ForecastProvider } from "@/store/ForecastContext";

export default function DefaultLayout() {
  return (
    <>
      <ForecastProvider>
        <SafeAreaView style={styles.safeAreStyle}>
          <LinearGradient colors={[colors.blue.dark, "transparent"]} style={styles.background} />
          <Slot />
          <StatusBar style="auto" translucent />
        </SafeAreaView>
      </ForecastProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreStyle: {
    flex: 1,
    backgroundColor: colors.blue.light,
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
