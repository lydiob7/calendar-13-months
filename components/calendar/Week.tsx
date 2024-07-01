import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Day from "./Day";
import GridView from "../GridView";

interface WeekProps {
    days: (number | null)[];
    isCurrentMonth: boolean;
    isSingleMonthScreen?: boolean;
}

const Week: FC<WeekProps> = ({ days, isCurrentMonth, isSingleMonthScreen }) => {
    return (
        <GridView
            data={days}
            renderView={(day: number | null) => (
                <Day day={day} isCurrentMonth={isCurrentMonth} isSingleMonthScreen={isSingleMonthScreen} />
            )}
            col={7}
        />
    );
};

export default Week;

const styles = StyleSheet.create({});
