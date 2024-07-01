import HomeHeader from "@/components/HomeHeader";
import HomeUserDetail from "@/components/HomeUserDetail";
import PresenceHeader from "@/components/PresenceHeader";
import PresenceList from "@/components/PresenceList";
import PresenceMonthModal from "@/components/PresenceMonthModal";
import { COLORS } from "@/constants/colors";
import { HOME_CONTAINER_PADDING } from "@/constants/style-sizes";
import { useSecureStore } from "@/hooks/useSecureStore";
import { getUserData } from "@/services/auth-service";
import { setUser } from "@/store/features/user-slice";
import { useAppDispatch } from "@/store/hooks";
import { getCurrentMonth } from "@/utils/date";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Index() {
  const store = useSecureStore();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  const fetchUser = async () => {
    try {
      setIsLoading(true);

      const res = await getUserData();
      if (res.user) {
        dispatch(setUser(res.user));
      }
    } catch (error: any) {
      Alert.alert(
        "Failed getting user data",
        error?.response?.data?.message || error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const hasToken = await store.getItem("token");
        if (!hasToken) {
          router.navigate("/login");
        } else {
          fetchUser();
        }
      };

      checkToken();
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.image}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <HomeHeader />

          <HomeUserDetail loading={isLoading} />

          <PresenceHeader
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            openModal={() => setIsShowModal(true)}
            loading={isLoading}
          />

          <PresenceMonthModal
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            visible={isShowModal}
            setVisible={setIsShowModal}
          />

          <PresenceList currentMonth={currentMonth} />
        </View>
      </ScrollView>

      {!isLoading && (
        <TouchableOpacity
          style={styles.qrCodeBtn}
          onPress={() => router.navigate("/scanner")}
        >
          <MaterialIcons name="qr-code-scanner" size={36} color="white" />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    position: "relative",
  },
  container: {
    flex: 1,
    padding: HOME_CONTAINER_PADDING,
  },
  qrCodeBtn: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 30,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
