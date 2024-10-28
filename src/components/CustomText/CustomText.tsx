import React, { PropsWithChildren } from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { fontSize as fontSizeTokens } from "@/tokens/fontSize";
import { colors } from "@/tokens/colors";

interface CustomTextProps {
  size: keyof typeof fontSizeTokens;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const CustomText = ({ size, style, children }: PropsWithChildren<CustomTextProps>) => {
  const fontSize = fontSizeTokens[size];

  return <Text style={[styles.text, { fontSize }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});
