import React, { ComponentProps, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import BaseSelect from "./BaseSelect";
import { IBaseOption } from "@/interfaces/base.interface";
import BaseText from "./BaseText";
import { COLORS } from "@/constants/colors";

export interface BaseInputProps {
  label?: string;
  type?: "text" | "password" | "select";
  icon?: IconProps<
    ComponentProps<typeof MaterialIcons | typeof Ionicons>["name"]
  >["name"];
  iconType?: "material" | "ion";
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ComponentProps<typeof TextInput>["style"];
  keyboardType?: ComponentProps<typeof TextInput>["keyboardType"];
  // Select Props
  items?: IBaseOption[];
  onValueChange?: (value: string) => void;
}

export default function BaseInput({
  type = "text",
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  style,
  keyboardType,
  items,
  onValueChange,
  iconType = "material",
}: BaseInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (iconType === "material") {
      return (
        <MaterialIcons
          name={icon as any}
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
      );
    }
    if (iconType === "ion") {
      return (
        <Ionicons
          name={icon as any}
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
      );
    }
  };

  return (
    <View style={[{ width: "100%" }, style]}>
      {label && <BaseText style={styles.label}>{label}</BaseText>}

      <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}>
          {icon && getIcon()}

          {type === "select" ? (
            <BaseSelect
              items={items}
              onValueChange={onValueChange}
              placeholder={placeholder}
              value={value}
              style={{ marginLeft: -16 }}
            />
          ) : (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              secureTextEntry={type === "password" && !showPassword}
              style={styles.inputField}
              keyboardType={keyboardType}
            />
          )}
        </View>

        {type === "password" && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ justifyContent: "center" }}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="black"
              style={{ marginLeft: 8 }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "500",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  inputFieldContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
  },
});
