import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSecureStore } from "@/hooks/useSecureStore";
import { useAppDispatch } from "@/store/hooks";
import { unsetUser } from "@/store/features/user-slice";
import { router } from "expo-router";
import BaseText from "./BaseText";

export default function HomeHeader() {
  const store = useSecureStore();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    store.setItem("token", "");
    dispatch(unsetUser());
    router.replace("/login");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleLogout} style={styles.headerBtn}>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
      <BaseText style={styles.headerTitle}>ClockInEase</BaseText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  headerBtn: {
    marginRight: 20,
    transform: [{ rotate: "180deg" }],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
