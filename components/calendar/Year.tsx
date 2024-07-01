import React, { FC } from "react";
import Month from "./Month";
import { StyleSheet, View } from "react-native";
import GridView from "../GridView";
import { useCalendarContext } from "@/context/calendarContext";
import { calculateStartDay, fixedCalendarMonths, gregorianMonths } from "@/utils";

interface YearProps {}

const Year: FC<YearProps> = () => {
    const { currentYear, today, viewMode } = useCalendarContext();

    const months = viewMode === "gregorian" ? gregorianMonths : fixedCalendarMonths;

    return (
        <View style={styles.container}>
            <GridView
                data={months}
                renderView={(month: any) => {
                    const startDay = calculateStartDay(month, currentYear);
                    return <Month key={month} monthKey={month} startDay={startDay} />;
                }}
                col={3}
            />
        </View>
    );
};

export default Year;

const styles = StyleSheet.create({
    container: {}
});
