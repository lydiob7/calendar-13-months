import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import {
    CustomDate,
    calculateDayOfTheWeek,
    calculateStartDay,
    daysOfTheWeek,
    divideMonthIntoWeeks,
    monthDaysMap,
    monthsMap
} from "@/utils";
import React, { FC, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import DayOutOfTime from "./DayOutOfTime";
import Week from "./Week";
import GridView from "../GridView";
import EventsList from "./EventsList";

interface MonthViewScreenProps {
    month?: GregorianMonth | FixedCalendarMonth;
    year?: string;
}

const MonthViewScreen: FC<MonthViewScreenProps> = ({ month, year }) => {
    const { currentYear, handleSelectDate, selectedDate, today, viewMode } = useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear()?.toString() === currentYear?.toString(),
        [currentYear, today]
    );
    const isCurrentMonth = useMemo(
        () => isCurrentYear && today.getMonth({ type: viewMode }) === monthsMap[month || "january"],
        [isCurrentYear, month, today, viewMode]
    );

    const days = useMemo(
        () =>
            month
                ? monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear())[month] ||
                  monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default
                : monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default,
        [currentYear, month]
    );

    const startDay = useMemo(() => (month ? calculateStartDay(month, currentYear) : 0), [currentYear, month]);

    const selectedDateDay = useMemo(
        () => calculateDayOfTheWeek({ selectedDate, days, startDay }),
        [selectedDate, viewMode]
    );

    useEffect(() => {
        if (month)
            handleSelectDate({
                date: 1,
                month: month,
                year: currentYear
            });
    }, [currentYear, month]);

    if (!month || !year) return null;

    return (
        <View style={styles.month}>
            {month === "day-out-of-time" ? (
                <DayOutOfTime isSingleMonthScreen />
            ) : (
                <View style={styles.weeksWrapper}>
                    <GridView
                        data={daysOfTheWeek}
                        renderView={(dayOfTheWeek: string) => (
                            <ThemedText
                                style={[styles.weekDay, selectedDateDay === dayOfTheWeek && styles.selectedDay]}
                            >
                                {dayOfTheWeek}
                            </ThemedText>
                        )}
                        col={7}
                        style={styles.weekDaysRow}
                    />
                    {divideMonthIntoWeeks({ days, startDay }).map((week, i) => (
                        <Week
                            days={week}
                            isCurrentMonth={isCurrentMonth}
                            key={i}
                            isSingleMonthScreen
                            monthKey={month}
                        />
                    ))}
                </View>
            )}

            <EventsList />
        </View>
    );
};

export default MonthViewScreen;

const styles = StyleSheet.create({
    currentMonth: {
        color: Colors.dark.tint
    },
    month: {
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    monthTitle: {
        fontSize: 26,
        fontWeight: 500
    },
    selectedDay: {
        color: Colors.dark.text
    },
    weekDay: {
        color: "gray",
        fontWeight: 600,
        fontSize: 12
    },
    weekDaysRow: {
        backgroundColor: Colors.dark.background,
        paddingTop: 8,
        paddingBottom: 4
    },
    weeksWrapper: {}
});
