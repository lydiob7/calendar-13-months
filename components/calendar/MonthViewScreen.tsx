import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
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

interface MonthViewScreenProps {}

const MonthViewScreen: FC<MonthViewScreenProps> = () => {
    const { currentMonth, currentYear, handleSelectDate, preventAutomaticDaySelect, selectedDate, today, viewMode } =
        useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear()?.toString() === currentYear?.toString(),
        [currentYear, today]
    );
    const isCurrentMonth = useMemo(
        () => !!(isCurrentYear && currentMonth && today.getMonth({ type: viewMode }) === monthsMap[currentMonth]),
        [currentMonth, isCurrentYear, today, viewMode]
    );

    const days = useMemo(
        () =>
            currentMonth
                ? monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear())[currentMonth] ||
                  monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default
                : monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default,
        [currentMonth, currentYear]
    );

    const startDay = useMemo(
        () => (currentMonth ? calculateStartDay(currentMonth, currentYear) : 0),
        [currentMonth, currentYear]
    );

    const selectedDateDay = useMemo(
        () => calculateDayOfTheWeek({ selectedDate, days, startDay }),
        [selectedDate, viewMode]
    );

    useEffect(() => {
        if (currentMonth && !preventAutomaticDaySelect)
            handleSelectDate({
                date: 1,
                month: currentMonth,
                year: currentYear
            });
    }, [currentMonth, currentYear, preventAutomaticDaySelect]);

    if (!currentMonth || !currentYear) return null;

    return (
        <View style={styles.month}>
            {currentMonth === "day-out-of-time" ? (
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
                            monthKey={currentMonth}
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
        paddingVertical: 12,
        flex: 1
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
