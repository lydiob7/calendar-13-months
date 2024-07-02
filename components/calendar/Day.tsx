import React, { FC, useMemo } from "react";
import { ThemedText } from "../ThemedText";
import { Pressable, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";

interface DayProps {
    day: number | null;
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    monthKey: GregorianMonth | FixedCalendarMonth;
    textStyle?: StyleProp<TextStyle>;
}

const Day: FC<DayProps> = ({ day, isCurrentMonth, isSingleMonthScreen, monthKey, textStyle }) => {
    const { currentYear, handleSelectDate, selectedDate, today, viewMode } = useCalendarContext();

    const isCurrentDay = useMemo(
        () => isCurrentMonth && today.getDate({ type: viewMode }) === day,
        [day, isCurrentMonth, today, viewMode]
    );

    const isSelected = useMemo(
        () =>
            selectedDate?.year?.toString() === currentYear?.toString() &&
            selectedDate.month === monthKey &&
            selectedDate?.date === day,
        [currentYear, day, monthKey, selectedDate]
    );

    if (!day) return;

    return (
        <View
            style={[
                isCurrentDay && styles.currentDay,
                isSingleMonthScreen && isSelected && styles.selectedDate,
                ((isCurrentDay && isSelected) || (isCurrentDay && !isSingleMonthScreen)) && styles.currentDaySelected
            ]}
        >
            {isSingleMonthScreen ? (
                <Pressable
                    onPress={
                        isSingleMonthScreen
                            ? () =>
                                  handleSelectDate({
                                      date: day,
                                      month: monthKey,
                                      year: currentYear
                                  })
                            : undefined
                    }
                >
                    <ThemedText
                        style={[
                            styles.day,
                            textStyle,
                            isCurrentDay && styles.currentDayText,
                            isSelected && styles.selectedDateText,
                            isSelected && isCurrentDay && styles.selectedCurrentDateText,
                            styles.largeText
                        ]}
                    >
                        {day}
                    </ThemedText>
                </Pressable>
            ) : (
                <ThemedText
                    style={[styles.day, textStyle, isCurrentDay && styles.selectedCurrentDateText, styles.smallText]}
                >
                    {day}
                </ThemedText>
            )}
        </View>
    );
};

export default Day;

const styles = StyleSheet.create({
    currentDay: {},
    currentDaySelected: {
        backgroundColor: Colors.dark.tint,
        borderRadius: 999,
        padding: 0
    },
    currentDayText: {
        fontWeight: 500,
        color: Colors.dark.tint
    },
    day: {
        textAlign: "center"
    },
    largeText: {
        padding: 4,
        fontSize: 20,
        lineHeight: 24,
        minWidth: 30
    },
    selectedDate: {
        backgroundColor: Colors.dark.text,
        borderRadius: 999,
        padding: 0
    },
    selectedDateText: {
        fontWeight: 500,
        color: Colors.dark.background
    },
    selectedCurrentDateText: {
        fontWeight: 500,
        color: Colors.dark.text
    },
    smallText: {
        paddingHorizontal: 0,
        paddingVertical: 2,
        fontSize: 10,
        lineHeight: 14,
        minWidth: 16
    }
});
