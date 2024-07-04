import React, { FC, useMemo } from "react";
import Month from "./Month";
import { StyleSheet, View } from "react-native";
import GridView from "../GridView";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate, LEAP_DAY_KEY, calculateStartDay, fixedCalendarMonths, gregorianMonths } from "@/utils";

interface YearProps {}

const Year: FC<YearProps> = () => {
    const { currentYear, viewMode } = useCalendarContext();

    const months = useMemo(() => {
        const isLeapYear = new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear();
        const fixedMonths = isLeapYear
            ? fixedCalendarMonths
            : fixedCalendarMonths.filter((month) => month !== LEAP_DAY_KEY);
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
