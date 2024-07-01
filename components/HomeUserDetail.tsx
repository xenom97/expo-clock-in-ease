import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppSelector } from "@/store/hooks";
import BaseText from "./BaseText";
import { Shimmer } from "./Shimmer";

export default function HomeUserDetail({ loading }: { loading: boolean }) {
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      <BaseText style={styles.welcomeText}>Selamat datang,</BaseText>

      <View style={styles.userContainer}>
        <Shimmer
          visible={!loading}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        >
          <MaterialIcons name="account-circle" size={50} color="black" />
        </Shimmer>

        <View style={styles.userDetails}>
          <Shimmer
            visible={!loading}
            style={{ width: 80, height: 25, borderRadius: 10 }}
          >
            <BaseText style={styles.userName}>{user?.name}</BaseText>
          </Shimmer>
          <Shimmer
            visible={!loading}
            style={{
              width: 150,
              height: 20,
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            <BaseText style={styles.userEmail}>{user?.email}</BaseText>
          </Shimmer>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 10,
    fontStyle: "italic",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginLeft: 10,
    flexDirection: "column",
  },
  userName: {
    fontWeight: "700",
    fontSize: 18,
  },
  userEmail: {
    fontStyle: "italic",
    color: "gray",
  },
});
