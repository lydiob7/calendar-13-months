import React, { FC } from "react";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import { ThemedText } from "../ThemedText";
import { StyleSheet, View } from "react-native";
import { CustomDate, divideMonthIntoWeeks, monthDaysMap, monthsMap } from "@/utils";
import Week from "./Week";
import DayOutOfTime from "./DayOutOfTime";
import language from "@/config/languages";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
import { Link } from "expo-router";

interface MonthProps {
    monthKey: GregorianMonth | FixedCalendarMonth;
    startDay: number;
}

const Month: FC<MonthProps> = ({ monthKey, startDay }) => {
    const { currentYear, today, viewMode } = useCalendarContext();

    const isCurrentYear = today.getFullYear() === currentYear;
    const isCurrentMonth = isCurrentYear && today.getMonth({ type: viewMode }) === monthsMap[monthKey];

    const days =
        monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear())[monthKey] |
        monthDaysMap(new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear()).default;

    return (
        <View style={styles.month}>
            <ThemedText
                style={{
                    ...styles.monthTitle,
                    ...(isCurrentMonth ? styles.currentMonth : {})
                }}
            >
                {language.months[monthKey]}
            </ThemedText>
            {monthKey === "day-out-of-time" ? (
                <DayOutOfTime />
            ) : (
                <Link href={`month/${currentYear}/${monthKey}`}>
                    <View style={styles.weeksWrapper}>
                        {divideMonthIntoWeeks({ days, startDay }).map((week, i) => (
                            <Week days={week} isCurrentMonth={isCurrentMonth} key={i} />
                        ))}
                    </View>
                </Link>
            )}
        </View>
    );
};

export default Month;

const styles = StyleSheet.create({
    currentMonth: {
        color: Colors.dark.tint
    },
    month: {
        paddingHorizontal: 3,
        paddingVertical: 5
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: 500
    },
    weeksWrapper: {}
});
