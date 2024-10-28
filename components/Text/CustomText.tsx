import React, { PropsWithChildren } from "react";
import { Text, StyleSheet } from "react-native";
import { fontSize as fontSizeTokens } from "../../tokens/fontSize";
import { colors } from "../../tokens/colors";

interface CustomTextProps {
  size: keyof typeof fontSizeTokens;
  children: React.ReactNode;
}

const CustomText = ({ size, children }: PropsWithChildren<CustomTextProps>) => {
  const fontSize = fontSizeTokens[size];

  return <Text style={[styles.text, { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});

export default CustomText;