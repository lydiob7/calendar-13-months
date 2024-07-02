import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Day from "./Day";
import GridView from "../GridView";
import { Colors } from "@/constants/Colors";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";

interface WeekProps {
    days: (number | null)[];
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
    monthKey: GregorianMonth | FixedCalendarMonth;
}

const Week: FC<WeekProps> = ({ days, isCurrentMonth, isSingleMonthScreen, monthKey }) => {
    return (
        <GridView
            data={days}
            renderView={(day: number | null, i) => (
                <Day
                    day={day}
                    isCurrentMonth={isCurrentMonth}
                    isSingleMonthScreen={isSingleMonthScreen}
                    monthKey={monthKey}
                    textStyle={isSingleMonthScreen && (i === 0 || i === 6) && styles.disabledText}
                />
            )}
            col={7}
            style={isSingleMonthScreen ? styles.weekRowSingleMonth : styles.weekRowYearScreen}
        />
    );
};

export default Week;

const styles = StyleSheet.create({
    disabledText: {
        color: "gray"
    },
    weekRowSingleMonth: {
        borderBottomColor: Colors.dark.background,
        borderWidth: 1,
        paddingTop: 2,
        paddingBottom: 8
    },
    weekRowYearScreen: {}
});
