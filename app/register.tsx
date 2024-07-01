import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import {
  getBranches,
  getDepartmentsByDivisionId,
  getDivisions,
  register,
} from "@/services/auth-service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
// import * as Device from "expo-device";
import { IBaseOption } from "@/interfaces/base.interface";
import BaseText from "@/components/BaseText";

export default function Register() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [position, setPosition] = useState("");

  const [divisionList, setDivisionList] = useState<IBaseOption[]>([]);
  const [departmentList, setDepartmentList] = useState<IBaseOption[]>([]);
  const [branchList, setBranchList] = useState<IBaseOption[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchDivisions = async () => {
    try {
      const data = await getDivisions();
      if (data) {
        if (Array.isArray(data)) {
          const list = data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setDivisionList(list);
        } else {
          setDivisionList([]);
        }
      }
    } catch (error: any) {
      Alert.alert("Failed getting divisions", error?.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await getDepartmentsByDivisionId(division);
      if (data) {
        if (Array.isArray(data)) {
          const list = data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setDepartmentList(list);
          setDepartment("");
        } else {
          setDepartmentList([]);
        }
      }
    } catch (error: any) {
      Alert.alert("Failed getting departments", error?.message);
    }
  };

  const fetchBranches = async () => {
    try {
      const data = await getBranches();
      if (data) {
        if (Array.isArray(data)) {
          const list = data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
          setBranchList(list);
        } else {
          setBranchList([]);
        }
      }
    } catch (error: any) {
      Alert.alert("Failed getting branches", error?.message);
    }
  };

  useEffect(() => {
    if (division) {
      fetchDepartments();
    }
  }, [division]);

  useEffect(() => {
    fetchDivisions();
    fetchBranches();
  }, []);

  const handleSubmit = async () => {
    if (
      !name ||
      !gender ||
      !phone ||
      !email ||
      !password ||
      !division ||
      !department ||
      !branch ||
      !position
    ) {
      Alert.alert("Opps!", "Please fill in all the fields");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        name,
        gender,
        email,
        password,
        phone_number: phone,
        division,
        department,
        branch,
        position,
        // Sample device
        device_model: `Model-${Date.now()}`,
      };

      const res = await register(payload);

      if (res.status === "OK") {
        Alert.alert("Success", "Your account has been created");
        router.push("/login");
        return;
      }
    } catch (error: any) {
      Alert.alert(
        "Failed to register",
        error?.response?.data?.message || error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.image}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <BaseText style={styles.title}>Daftar</BaseText>

          <BaseInput
            label="Nama Lengkap"
            placeholder="Masukkan nama..."
            icon="account-circle"
            style={{ marginTop: 14 }}
            value={name}
            onChangeText={setName}
          />
          <BaseInput
            label="Pilih Gender"
            placeholder="Nama Pilihan Gender"
            icon="wc"
            style={{ marginTop: 14 }}
            type="select"
            items={[
              { label: "Pria", value: "pria" },
              { label: "Wanita", value: "wanita" },
            ]}
            value={gender}
            onValueChange={setGender}
          />
          <BaseInput
            label="Nomor Telepon"
            placeholder="08123456789"
            icon="phone"
            keyboardType="phone-pad"
            style={{ marginTop: 14 }}
            value={phone}
            onChangeText={setPhone}
          />
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
          <BaseInput
            label="Pilih Divisi"
            placeholder="Nama Pilihan Divisi"
            icon="work"
            style={{ marginTop: 14 }}
            type="select"
            items={divisionList}
            onValueChange={setDivision}
            value={division}
          />
          <BaseInput
            label="Pilih Departemen"
            placeholder="Nama Pilihan Departemen"
            icon="domain"
            style={{ marginTop: 14 }}
            type="select"
            items={departmentList}
            onValueChange={setDepartment}
            value={department}
          />
          <BaseInput
            label="Pilih Cabang"
            placeholder="Nama Pilihan Cabang"
            icon="git-merge"
            iconType="ion"
            style={{ marginTop: 14 }}
            type="select"
            items={branchList}
            onValueChange={setBranch}
            value={branch}
          />
          <BaseInput
            label="Pilih Jabatan"
            placeholder="Nama Pilihan Jabatan"
            icon="supervisor-account"
            style={{ marginTop: 14 }}
            type="select"
            items={[
              { label: "Staff", value: "staff" },
              { label: "Supervisor", value: "supervisor" },
              { label: "Manager", value: "manager" },
            ]}
            onValueChange={setPosition}
            value={position}
          />

          <BaseButton
            title="Daftar"
            style={{ marginTop: 24, width: "100%" }}
            loading={isLoading}
            onPress={handleSubmit}
          />
          <BaseButton
            variant="secondary"
            title="Kembali"
            style={{ marginTop: 10, width: 140 }}
            onPress={() => router.back()}
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
