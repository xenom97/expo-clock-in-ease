import { Alert, Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  HOME_CONTAINER_PADDING,
  HOME_PRESENCE_ITEM_MARGIN,
} from "@/constants/style-sizes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getPresence } from "@/services/presence-service";
import {
  IResponseGetPresence,
  StatusPresence,
} from "@/interfaces/presence.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setHasCheckedInToday,
  setHasCheckedOutToday,
  setRefetchPresence,
} from "@/store/features/presence-slice";
import BaseText from "./BaseText";
import { Shimmer } from "./Shimmer";
import { MONTHS } from "@/constants/month";

interface IPresenceListProps {
  currentMonth: number;
}

export default function PresenceList({ currentMonth }: IPresenceListProps) {
  const [dataPresence, setDataPresence] = useState<IResponseGetPresence>({});
  const dispatch = useAppDispatch();
  const isRefetch = useAppSelector((state) => state.presence.refetchPresence);

  const [isLoading, setIsLoading] = useState(true);

  const days = useMemo(() => {
    const currentMonthName = MONTHS[currentMonth];
    return dataPresence[currentMonthName] || [];
  }, [currentMonth, dataPresence]);

  useEffect(() => {
    fetchPresence();
  }, [isRefetch]);

  const fetchPresence = async () => {
    try {
      setIsLoading(true);
      const res = await getPresence();
      setDataPresence(res);
      updateTodayPresenceStatus();

      if (isRefetch) {
        dispatch(setRefetchPresence(false));
      }
    } catch (error: any) {
      Alert.alert(
        "Failed getting presence data",
        error?.response?.data?.message || error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodayPresenceStatus = () => {
    if (!Object.keys(dataPresence || {}).length) return;

    const currentMonthName = MONTHS[currentMonth];
    const currentMonthData = dataPresence[currentMonthName];
    const todayData = currentMonthData[new Date().getDate() - 1];

    if (todayData?.in && todayData?.out) {
      dispatch(setHasCheckedInToday(!!todayData.in?.trim()));
      dispatch(setHasCheckedOutToday(!!todayData.out?.trim()));
    }
  };

  if (isLoading) {
    return (
      <FlatList
        data={[...Array(16).keys()]}
        renderItem={() => (
          <Shimmer
            style={[
              {
                height: 60,
                borderRadius: 5,
                width:
                  (Dimensions.get("window").width -
                    HOME_CONTAINER_PADDING * 2) /
                    4 -
                  HOME_PRESENCE_ITEM_MARGIN * 2,
                margin: HOME_PRESENCE_ITEM_MARGIN,
              },
            ]}
          />
        )}
        keyExtractor={(x) => String(x)}
        numColumns={4}
        scrollEnabled={false}
        style={styles.container}
      />
    );
  }

  if (!days.length) {
    return (
      <View style={styles.noDataContainer}>
        <BaseText style={styles.noDataText}>No data</BaseText>
      </View>
    );
  }

  return (
    <FlatList
      data={days}
      renderItem={({ item, index }) => (
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor:
                item.statusPresence === StatusPresence.Hadir
                  ? "#1E90FF"
                  : "black",
            },
          ]}
        >
          <View style={styles.itemHeader}>
            <BaseText style={styles.itemDate}>{index + 1}</BaseText>

            {item.statusPresence === StatusPresence.Hadir && (
              <MaterialIcons name="check-circle" size={10} color="white" />
            )}
          </View>
          <BaseText style={styles.statusText}>{item.statusPresence}</BaseText>
          <BaseText style={styles.clockInText}>{item.in}</BaseText>
        </View>
      )}
      keyExtractor={(_, idx) => String(idx + 1)}
      numColumns={4}
      scrollEnabled={false}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 80,
  },
  itemContainer: {
    borderRadius: 5,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // TODO: Revisit this
    width:
      (Dimensions.get("window").width - HOME_CONTAINER_PADDING * 2) / 4 -
      HOME_PRESENCE_ITEM_MARGIN * 2,
    margin: HOME_PRESENCE_ITEM_MARGIN,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemDate: {
    color: "#D2D2D2",
    fontSize: 10,
    fontWeight: "500",
  },
  statusText: {
    color: "white",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
  },
  clockInText: {
    color: "white",
    fontSize: 8,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
  },
  noDataContainer: {
    padding: 16,
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 1,
    zIndex: 1,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
