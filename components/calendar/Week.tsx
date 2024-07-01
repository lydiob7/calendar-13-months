import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Day from "./Day";
import GridView from "../GridView";
import { Colors } from "@/constants/Colors";

interface WeekProps {
    days: (number | null)[];
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
}

const Week: FC<WeekProps> = ({ days, isCurrentMonth, isSingleMonthScreen }) => {
    return (
        <GridView
            data={days}
            renderView={(day: number | null, i) => (
                <Day
                    day={day}
                    isCurrentMonth={isCurrentMonth}
                    isSingleMonthScreen={isSingleMonthScreen}
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
