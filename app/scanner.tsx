import { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { postPresenceIn, postPresenceOut } from "@/services/presence-service";
import { StatusPresence } from "@/interfaces/presence.interface";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setHasCheckedInToday,
  setHasCheckedOutToday,
  setRefetchPresence,
} from "@/store/features/presence-slice";
import BaseText from "@/components/BaseText";

enum PresenceType {
  PRESENSI_MASUK = "presensi-masuk",
  PRESENSI_PULANG = "presensi-pulang",
}

export default function Scanner() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isShowModal, setIsShowModal] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermission, setLocationPermission] =
    useState<Location.PermissionStatus | null>(null);

  const dispatch = useAppDispatch();
  const hasCheckedInToday = useAppSelector(
    (state) => state.presence.hasCheckedInToday
  );
  const hasCheckedOutToday = useAppSelector(
    (state) => state.presence.hasCheckedOutToday
  );

  const [isCameraBusy, setIsCameraBusy] = useState(false);

  const handleBarcodeScanned = async (data: string | PresenceType) => {
    setIsCameraBusy(true);

    if (
      data !== PresenceType.PRESENSI_MASUK &&
      data !== PresenceType.PRESENSI_PULANG
    ) {
      Alert.alert("Error", "Invalid QR code", [
        {
          text: "Scan again",
          onPress: () => {
            setIsCameraBusy(false);
          },
        },
      ]);
      return;
    }

    if (data === PresenceType.PRESENSI_MASUK && hasCheckedInToday) {
      Alert.alert("Error", "Already checked in today");
      router.navigate("/");
      return;
    }
    if (data === PresenceType.PRESENSI_PULANG && hasCheckedOutToday) {
      Alert.alert("Error", "Already checked out today");
      router.navigate("/");
      return;
    }

    try {
      setIsShowModal(true);

      let res;
      if (data === PresenceType.PRESENSI_MASUK) {
        res = await postPresenceIn({
          desc: data,
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          status: StatusPresence.Hadir,
        });
        dispatch(setHasCheckedInToday(true));
      } else {
        res = await postPresenceOut();
        dispatch(setHasCheckedOutToday(true));
      }

      Alert.alert("Success", res.message, [
        {
          text: "OK",
          onPress: () => {
            setIsShowModal(false);
            router.navigate("/");
            setIsCameraBusy(false);
            dispatch(setRefetchPresence(true));
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Failed", error?.response?.data?.message || error?.message);
    }
  };

  const requestCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    setLocation(location);
  };

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status);

    if (status === Location.PermissionStatus.GRANTED) {
      requestCurrentLocation();
    }
  };

  const requestPermission = () => {
    requestLocationPermission();
    requestCameraPermission();
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <ActivityIndicator size={30} color="#000" />
          <BaseText>Memeriksa perizinan...</BaseText>
        </View>
      </View>
    );
  }

  if (
    !cameraPermission.granted ||
    locationPermission !== Location.PermissionStatus.GRANTED
  ) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="warning" size={30} color="black" />
          <BaseText>
            {!cameraPermission.granted
              ? "Izin kamera ditolak"
              : "Izin lokasi ditolak"}
          </BaseText>
          <TouchableOpacity
            style={styles.reloadBtn}
            onPress={requestPermission}
          >
            <MaterialCommunityIcons name="reload" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isCameraBusy && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={({ data }) => handleBarcodeScanned(data)}
        >
          <View style={styles.scanContainer}>
            <MaterialCommunityIcons
              name="scan-helper"
              size={Dimensions.get("window").width - 80}
              color="#ffffff30"
            />
          </View>
        </CameraView>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => {
          setIsShowModal(!isShowModal);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <ActivityIndicator size={40} color="#000" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  scanContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionContainer: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    margin: 35,
  },
  reloadBtn: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    elevation: 3,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
