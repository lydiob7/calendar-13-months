import React, { FC } from "react";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";

interface DayProps {
    day: number | null;
    isCurrentMonth: boolean;
}

const Day: FC<DayProps> = ({ day, isCurrentMonth }) => {
    const { today, viewMode } = useCalendarContext();

    const isCurrentDay = isCurrentMonth && today.getDate({ type: viewMode }) === day;

    return (
        <View style={{ ...(isCurrentDay ? styles.currentDay : {}) }}>
            <ThemedText style={{ ...styles.day, ...(isCurrentDay ? styles.currentDayText : {}) }}>{day}</ThemedText>
        </View>
    );
};

export default Day;

const styles = StyleSheet.create({
    currentDay: {
        backgroundColor: Colors.dark.tint,
        borderRadius: 999,
        padding: 0
    },
    currentDayText: {
        fontWeight: 500
    },
    day: {
        paddingHorizontal: 1,
        paddingVertical: 2,
        fontSize: 10,
        lineHeight: 14
    }
});
