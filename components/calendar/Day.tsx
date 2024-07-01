import React, { FC } from "react";
import { ThemedText } from "../ThemedText";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";

interface DayProps {
    day: number | null;
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    textStyle?: StyleProp<TextStyle>;
}

const Day: FC<DayProps> = ({ day, isCurrentMonth, isSingleMonthScreen, textStyle }) => {
    const { today, viewMode } = useCalendarContext();

    const isCurrentDay = isCurrentMonth && today.getDate({ type: viewMode }) === day;

    return (
        <View style={[isCurrentDay && styles.currentDay]}>
            <ThemedText
                style={[
                    styles.day,
                    textStyle,
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
        fontWeight: 500,
        color: Colors.dark.text
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
