import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Day from "./Day";
import GridView from "../GridView";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import { useThemeColor } from "@/hooks/useThemeColor";

interface WeekProps {
    days: (number | null)[];
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    monthKey: GregorianMonth | FixedCalendarMonth;
}

const Week: FC<WeekProps> = ({ days, isCurrentMonth, isSingleMonthScreen, monthKey }) => {
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");

    return (
        <GridView
            data={days}
            renderView={(day: number | null, i) => (
                <Day
                    day={day}
                    isCurrentMonth={isCurrentMonth}
                    isSingleMonthScreen={isSingleMonthScreen}
                    monthKey={monthKey}
                    textStyle={isSingleMonthScreen && (i === 0 || i === 6) && { color: tabIconDefaultColor }}
                />
            )}
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
