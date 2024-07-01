import React, { FC } from "react";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";

interface DayProps {
    day: number | null;
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
}

const Day: FC<DayProps> = ({ day, isCurrentMonth, isSingleMonthScreen }) => {
    const { today, viewMode } = useCalendarContext();

    const isCurrentDay = isCurrentMonth && today.getDate({ type: viewMode }) === day;

    return (
        <View style={[isCurrentDay && styles.currentDay]}>
            <ThemedText
                style={[
                    styles.day,
                    isCurrentDay && styles.currentDayText,
                    isSingleMonthScreen ? styles.largeText : styles.smallText
                ]}
            >
                {day}
            </ThemedText>
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
        textAlign: "center"
    },
    largeText: {
        padding: 4,
        fontSize: 20,
        lineHeight: 24
    },
    smallText: {
        paddingHorizontal: 0,
        paddingVertical: 2,
        fontSize: 10,
        lineHeight: 14,
        width: 14
    }
});
