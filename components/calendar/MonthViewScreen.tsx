import { ThemedText } from "@/components/ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import {
    CustomDate,
    DAY_OUT_OF_TIME_KEY,
    LEAP_DAY_KEY,
    calculateDayOfTheWeek,
    calculateStartDay,
    daysOfTheWeek,
    divideMonthIntoWeeks,
    monthDaysMap,
    monthsMap
} from "@/utils";
import React, { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import DayOutOfTime from "./DayOutOfTime";
import Week from "./Week";
import GridView from "../GridView";
import EventsList from "./EventsList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import mainApiService from "@/services/mainApiService";

interface MonthViewScreenProps {}

const MonthViewScreen: FC<MonthViewScreenProps> = () => {
    const { language } = useTranslationsContext();

    const backgroundColor = useThemeColor({}, "background");
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const textColor = useThemeColor({}, "text");

    const [dayEvents, setDayEvents] = useState<string[]>([]);

    const { currentMonth, currentYear, selectedDate, today, viewMode } = useCalendarContext();

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
                ? monthDaysMap(new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear())[
                      currentMonth
                  ] || monthDaysMap(new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear()).default
                : monthDaysMap(new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear()).default,
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
        if (currentMonth)
            mainApiService
                .getRangeEvents({
                    startDate: {
                        date: 1,
                        month: currentMonth,
                        year: currentYear
                    },
                    endDate: {
                        date: days,
                        month: currentMonth,
                        year: currentYear
                    }
                })
                .then((response) => setDayEvents(response));
    }, [currentMonth, currentYear, days]);

    const dayOutOfTime = useMemo(() => currentMonth === DAY_OUT_OF_TIME_KEY, [currentMonth]);
    const leapDay = useMemo(() => currentMonth === LEAP_DAY_KEY, [currentMonth]);

    if (!currentMonth || !currentYear) return null;

    return (
        <View style={styles.month}>
            {(dayOutOfTime || leapDay) && <DayOutOfTime isSingleMonthScreen />}
            {!dayOutOfTime && !leapDay && (
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
                            dayEvents={dayEvents}
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
