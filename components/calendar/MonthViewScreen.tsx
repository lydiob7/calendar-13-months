import { ThemedText } from "@/components/ThemedText";
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
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";

interface MonthViewScreenProps {}

const MonthViewScreen: FC<MonthViewScreenProps> = () => {
    const { language } = useTranslationsContext();

    const backgroundColor = useThemeColor({}, "background");
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const textColor = useThemeColor({}, "text");

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
            ) : currentMonth === "leap-day" ? (
                <DayOutOfTime />
            ) : (
                <View style={styles.weeksWrapper}>
                    <GridView
                        data={daysOfTheWeek.map((d) => language?.daysOfTheWeek?.[d])}
                        renderView={(dayOfTheWeek: string) => (
                            <ThemedText
                                style={[
                                    styles.weekDay,
                                    { color: tabIconDefaultColor },
                                    selectedDateDay === dayOfTheWeek && { color: textColor }
                                ]}
                            >
                                {dayOfTheWeek}
                            </ThemedText>
                        )}
                        col={7}
                        style={[
                            styles.weekDaysRow,
                            { backgroundColor: backgroundColor, borderBottomColor: tabIconDefaultColor }
                        ]}
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
    month: {
        paddingHorizontal: 0,
        paddingVertical: 12,
        flex: 1
    },
    monthTitle: {
        fontSize: 26,
        fontWeight: 500
    },
    weekDay: {
        fontWeight: 600,
        fontSize: 12
    },
    weekDaysRow: {
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 4
    },
    weeksWrapper: {}
});
