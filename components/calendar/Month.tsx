import React, { FC, useCallback, useMemo } from "react";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import { ThemedText } from "../ThemedText";
import { Pressable, StyleSheet, View } from "react-native";
import { CustomDate, DAY_OUT_OF_TIME_KEY, divideMonthIntoWeeks, LEAP_DAY_KEY, monthDaysMap, monthsMap } from "@/utils";
import Week from "./Week";
import DayOutOfTime from "./DayOutOfTime";
import { Colors } from "@/constants/Colors";
import { useCalendarContext } from "@/context/calendarContext";
import { useTranslationsContext } from "@/context/translationsContext";
import routes from "@/config/routes";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface MonthProps {
    monthKey: GregorianMonth | FixedCalendarMonth;
    startDay: number;
}

const Month: FC<MonthProps> = ({ monthKey, startDay }) => {
    const navigation = useNavigation<DrawerNavigationHelpers>();
    const { language } = useTranslationsContext();
    const { currentYear, handleSelectFirstDayOfTheMonth, setCurrentMonth, setCurrentYear, today, viewMode } =
        useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear().toString() === currentYear.toString(),
        [currentYear, today]
    );
    const isCurrentMonth = useMemo(
        () => isCurrentYear && today.getMonth({ type: viewMode }) === monthsMap[monthKey],
        [isCurrentYear, monthKey, today, viewMode]
    );

    const days = useMemo(
        () =>
            monthDaysMap(new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear())[monthKey] ||
            monthDaysMap(new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear()).default,
        [currentYear, monthKey]
    );

    const dayOutOfTime = useMemo(() => monthKey === DAY_OUT_OF_TIME_KEY, [monthKey]);
    const leapDay = useMemo(() => monthKey === LEAP_DAY_KEY, [monthKey]);

    const handleSelectMonth = useCallback(() => {
        setCurrentYear(currentYear);
        setCurrentMonth(monthKey);
        handleSelectFirstDayOfTheMonth(monthKey, currentYear);
        navigation.navigate(routes.monthView);
    }, [currentYear, handleSelectFirstDayOfTheMonth, monthKey]);

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
            {(dayOutOfTime || leapDay) && (
                <DayOutOfTime monthKey={monthKey as typeof DAY_OUT_OF_TIME_KEY | typeof LEAP_DAY_KEY} />
            )}
            {!leapDay && !dayOutOfTime && (
                <Pressable onPress={handleSelectMonth}>
                    <View style={styles.weeksWrapper}>
                        {divideMonthIntoWeeks({ days, startDay }).map((week, i) => (
                            <Week days={week} isCurrentMonth={isCurrentMonth} key={i} monthKey={monthKey} />
                        ))}
                    </View>
                </Pressable>
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
