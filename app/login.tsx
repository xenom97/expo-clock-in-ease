import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseText from "@/components/BaseText";
import { useSecureStore } from "@/hooks/useSecureStore";
import { login } from "@/services/auth-service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const store = useSecureStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Failed login", "Email and password are required");
      return;
    }

    try {
      setIsLoading(true);

      const res = await login({ email, password });
      if (res.token) {
        await store.setItem("token", res.token);
        router.navigate("/");
      }
    } catch (error: any) {
      Alert.alert(
        "Failed login",
        error?.response?.data?.message || error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.image}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <BaseText style={styles.title}>Masuk</BaseText>

          <BaseInput
            label="Email"
            placeholder="contoh@email.com"
            icon="email"
            style={{ marginTop: 14 }}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <BaseInput
            label="Password"
            type="password"
            icon="lock"
            placeholder="Kata sandi..."
            style={{ marginTop: 24 }}
            value={password}
            onChangeText={setPassword}
          />

          <BaseButton
            title="Masuk"
            style={{ marginTop: 24, width: "100%" }}
            loading={isLoading}
            onPress={handleLogin}
          />
          <BaseButton
            variant="secondary"
            title="Daftar"
            style={{ marginTop: 10, width: 140 }}
            onPress={() => router.push("/register")}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});
