import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Day from "./Day";
import GridView from "../GridView";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useCalendarContext } from "@/context/calendarContext";
import { getGregorianEquivalent, monthsMap } from "@/utils";

interface WeekProps {
    dayEvents?: string[];
    days: (number | null)[];
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    monthKey: GregorianMonth | FixedCalendarMonth;
}

const Week: FC<WeekProps> = ({ dayEvents, days, isCurrentMonth, isSingleMonthScreen, monthKey }) => {
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const { currentYear } = useCalendarContext();

    return (
        <GridView
            data={days}
            renderView={(day: number | null, i) => {
                const gregorianDate = day
                    ? getGregorianEquivalent({
                          date: day,
                          month: monthKey,
                          year: currentYear
                      })
                    : null;
                const hasEvents = !isSingleMonthScreen || !gregorianDate ? false : dayEvents?.includes(gregorianDate);

                return (
                    <Day
                        day={day}
                        hasEvents={hasEvents}
                        isCurrentMonth={isCurrentMonth}
                        isSingleMonthScreen={isSingleMonthScreen}
                        monthKey={monthKey}
                        textStyle={isSingleMonthScreen && (i === 0 || i === 6) && { color: tabIconDefaultColor }}
                    />
                );
            }}
            col={7}
            style={
                isSingleMonthScreen
                    ? [styles.weekRowSingleMonth, { borderBottomColor: tabIconDefaultColor }]
                    : styles.weekRowYearScreen
            }
        />
    );
};

export default Week;

const styles = StyleSheet.create({
    weekRowSingleMonth: {
        borderBottomWidth: 1,
        paddingTop: 4,
        paddingBottom: 4
    },
    weekRowYearScreen: {}
});
