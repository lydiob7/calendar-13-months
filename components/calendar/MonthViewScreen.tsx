import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import { CustomDate, calculateStartDay, divideMonthIntoWeeks, monthDaysMap, monthsMap } from "@/utils";
import React, { FC } from "react";
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
    const { currentYear, today, viewMode } = useCalendarContext();

    const isCurrentYear = today.getFullYear() === currentYear;
    const isCurrentMonth = isCurrentYear && today.getMonth({ type: viewMode }) === monthsMap[month || "january"];

    const days = month
        ? monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear())[month] ||
          monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default
        : monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default;

    const startDay = month ? calculateStartDay(month, currentYear) : 0;

    if (!month || !year) return null;

    return (
        <View style={styles.month}>
            {month === "day-out-of-time" ? (
                <DayOutOfTime isSingleMonthScreen />
            ) : (
                <View style={styles.weeksWrapper}>
                    <GridView
                        data={["S", "M", "T", "W", "T", "F", "S"]}
                        renderView={(dayOfTheWeek: string) => (
                            <ThemedText style={styles.weekDay}>{dayOfTheWeek}</ThemedText>
                        )}
                        col={7}
                        style={styles.weekDaysRow}
                    />
                    {divideMonthIntoWeeks({ days, startDay }).map((week, i) => (
                        <Week days={week} isCurrentMonth={isCurrentMonth} key={i} isSingleMonthScreen />
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
    weekDay: {
        color: Colors.dark.tint,
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
