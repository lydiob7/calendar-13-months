import React, { FC, useMemo } from "react";
import Month from "./Month";
import { StyleSheet, View } from "react-native";
import GridView from "../GridView";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate, calculateStartDay, fixedCalendarMonths, gregorianMonths } from "@/utils";
import { ThemedText } from "../ThemedText";

interface YearProps {}

const Year: FC<YearProps> = () => {
    const { currentYear, viewMode } = useCalendarContext();

    const months = useMemo(() => {
        const isLeapYear = new CustomDate(`${currentYear}-02-02T00:00:00`).isLeapYear();
        const fixedMonths = isLeapYear
            ? fixedCalendarMonths
            : fixedCalendarMonths.filter((month) => month !== "leap-day");
        return viewMode === "gregorian" ? gregorianMonths : fixedMonths;
    }, [currentYear, viewMode]);

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
