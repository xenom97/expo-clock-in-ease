import { getMonthList } from "@/utils/date";
import React from "react";
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import BaseText from "./BaseText";

interface IPresenceMonthModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
}

const months = getMonthList().map((item, idx) => ({
  label: item,
  value: idx,
}));

export default function PresenceMonthModal({
  visible = false,
  setVisible,
  currentMonth,
  setCurrentMonth,
}: IPresenceMonthModalProps) {
  const handleSelectMonth = (value: number) => {
    setCurrentMonth(value);
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="calendar-range"
              size={24}
              color="black"
            />

            <BaseText style={styles.headerTitle}>Pilih Bulan</BaseText>

            <Pressable onPress={() => setVisible(!visible)}>
              <MaterialIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={months}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      marginTop: index === 0 ? 0 : 10,
                      backgroundColor:
                        currentMonth === item.value
                          ? COLORS.primary
                          : "#EBEBEB",
                    },
                  ]}
                  onPress={() => handleSelectMonth(item.value)}
                >
                  <BaseText style={styles.itemText}>{item.label}</BaseText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value.toString()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 14,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 10,
  },
  item: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  itemText: {
    fontWeight: "500",
    fontSize: 14,
  },
});
