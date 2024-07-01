import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ComponentProps } from "react";
import { COLORS } from "@/constants/colors";
import BaseText from "./BaseText";

export interface BaseButtonProps {
  title: string;
  style?: ComponentProps<typeof View>["style"];
  variant?: "primary" | "secondary";
  onPress?: () => void;
  loading?: boolean;
}

export default function BaseButton({
  title,
  style,
  onPress,
  variant = "primary",
  loading,
}: BaseButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            variant === "primary" ? COLORS.primary : COLORS.secondary,
        },
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <BaseText style={styles.title}>{title}</BaseText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "white",
    textAlign: "center",
    textShadowColor: "#00000080",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.5,
    elevation: 1,
  },
});
