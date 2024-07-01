import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrentMonth, getMonthName } from "@/utils/date";
import BaseText from "./BaseText";
import { Shimmer } from "./Shimmer";
import { isLoading } from "expo-font";

interface IPresenceHeaderProps {
  openModal: () => void;
  currentMonth: number;
  setCurrentMonth: (value: number) => void;
  loading: boolean;
}

export default function PresenceHeader({
  openModal,
  currentMonth,
  setCurrentMonth,
  loading,
}: IPresenceHeaderProps) {
  const currentMonthName = useMemo(() => {
    return getMonthName(currentMonth);
  }, [currentMonth]);

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };

  const isDisabledNextMonth = useMemo(() => {
    return currentMonth === getCurrentMonth();
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };

  const isDisabledPrevMonth = useMemo(() => {
    return currentMonth === 1;
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        {loading ? (
          <>
            <Shimmer style={{ width: 30, height: 30, borderRadius: 30 }} />
            <Shimmer style={{ width: 120, height: 30, borderRadius: 10 }} />
            <Shimmer style={{ width: 30, height: 30, borderRadius: 30 }} />
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.arrowBtn,
                isDisabledPrevMonth && styles.arrowBtnDisabled,
              ]}
              disabled={isDisabledPrevMonth}
              onPress={handlePrevMonth}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="black"
              />
            </TouchableOpacity>

            <BaseText style={styles.monthText}>{currentMonthName}</BaseText>

            <TouchableOpacity
              style={[
                styles.arrowBtn,
                isDisabledNextMonth && styles.arrowBtnDisabled,
              ]}
              disabled={isDisabledNextMonth}
              onPress={handleNextMonth}
            >
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      <Shimmer style={styles.calendarBtn} visible={!loading}>
        <TouchableOpacity style={styles.calendarBtn} onPress={openModal}>
          <MaterialCommunityIcons
            name="calendar-range"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </Shimmer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  arrowBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  arrowBtnDisabled: {
    opacity: 0.5,
  },
  monthText: {
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 100,
    elevation: 5,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  calendarBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 5,
  },
});
