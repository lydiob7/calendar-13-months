import React, { FC, useMemo } from "react";
import { ThemedText } from "../ThemedText";
import { Pressable, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { useCalendarContext } from "@/context/calendarContext";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import { useThemeColor } from "@/hooks/useThemeColor";

interface DayProps {
    day: number | null;
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    monthKey: GregorianMonth | FixedCalendarMonth;
    textStyle?: StyleProp<TextStyle>;
}

const Day: FC<DayProps> = ({ day, isCurrentMonth, isSingleMonthScreen, monthKey, textStyle }) => {
    const backgroundColor = useThemeColor({}, "background");
    const tabIconSelectedColor = useThemeColor({}, "tabIconSelected");
    const textColor = useThemeColor({}, "text");

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
                isSingleMonthScreen && isSelected && [styles.selectedDate, { backgroundColor: textColor }],
                ((isCurrentDay && isSelected) || (isCurrentDay && !isSingleMonthScreen)) && [
                    styles.currentDaySelected,
                    {
                        backgroundColor: tabIconSelectedColor
                    }
                ]
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
                            isCurrentDay && [styles.currentDayText, { color: tabIconSelectedColor }],
                            isSelected && [styles.selectedDateText, { color: backgroundColor }],
                            isSelected && isCurrentDay && styles.selectedCurrentDateText,
                            styles.largeText
                        ]}
                    >
                        {day}
                    </ThemedText>
                </Pressable>
            ) : (
                <ThemedText
                    style={[
                        styles.day,
                        textStyle,
                        isCurrentDay && [styles.selectedCurrentDateText, { color: backgroundColor }],
                        styles.smallText
                    ]}
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
        borderRadius: 4,
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
        lineHeight: 24,
        minWidth: 30
    },
    selectedDate: {
        borderRadius: 4,
        padding: 0
    },
    selectedDateText: {
        fontWeight: 500
    },
    selectedCurrentDateText: {
        fontWeight: 500
    },
    smallText: {
        paddingHorizontal: 0,
        paddingVertical: 2,
        fontSize: 10,
        lineHeight: 14,
        minWidth: 16
    }
});
