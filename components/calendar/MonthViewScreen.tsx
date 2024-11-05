import { ThemedText } from "@/components/ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import {
    DAY_OUT_OF_TIME_KEY,
    LEAP_DAY_KEY,
    calculateDayOfTheWeek,
    calculateStartDay,
    daysOfTheWeek,
    divideMonthIntoWeeks,
    monthsMap
} from "@/utils";
import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import DayOutOfTime from "./DayOutOfTime";
import Week from "./Week";
import GridView from "../GridView";
import EventsList from "./EventsList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useEventsContext } from "@/context/eventsContext";

interface MonthViewScreenProps {}

const MonthViewScreen: FC<MonthViewScreenProps> = () => {
    const backgroundColor = useThemeColor({}, "background");
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const textColor = useThemeColor({}, "text");

    const { language } = useTranslationsContext();
    const { monthEvents } = useEventsContext();

    const { currentMonth, currentYear, monthDays, selectedDate, today, viewMode } = useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear()?.toString() === currentYear?.toString(),
        [currentYear, today]
    );
    const isCurrentMonth = useMemo(
        () => !!(isCurrentYear && currentMonth && today.getMonth({ type: viewMode }) === monthsMap[currentMonth]),
        [currentMonth, isCurrentYear, today, viewMode]
    );

    const startDay = useMemo(
        () => (currentMonth ? calculateStartDay(currentMonth, currentYear) : 0),
        [currentMonth, currentYear]
    );

    const selectedDateDay = useMemo(
        () => calculateDayOfTheWeek({ selectedDate, days: monthDays, startDay }),
        [selectedDate, viewMode]
    );

    const dayOutOfTime = useMemo(() => currentMonth === DAY_OUT_OF_TIME_KEY, [currentMonth]);
    const leapDay = useMemo(() => currentMonth === LEAP_DAY_KEY, [currentMonth]);

    if (!currentMonth || !currentYear) return null;

    return (
        <View style={styles.month}>
            {(dayOutOfTime || leapDay) && <DayOutOfTime isSingleMonthScreen />}
            {!dayOutOfTime && !leapDay && (
                <View style={styles.weeksWrapper}>
                    <GridView
                        data={daysOfTheWeek.map((d) => language?.daysOfTheWeek?.short?.[d])}
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
                    {divideMonthIntoWeeks({ days: monthDays, startDay }).map((week, i) => (
                        <Week
                            dayEvents={monthEvents}
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
