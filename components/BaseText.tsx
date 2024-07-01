import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

export default function BaseText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter",
  },
});
