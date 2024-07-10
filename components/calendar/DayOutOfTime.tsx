import { useCalendarContext } from "@/context/calendarContext";
import { DAY_OUT_OF_TIME_KEY, LEAP_DAY_KEY } from "@/utils";
import { useLinkTo } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface DayOutOfTimeProps {
    monthKey?: typeof DAY_OUT_OF_TIME_KEY | typeof LEAP_DAY_KEY;
    isSingleMonthScreen?: boolean;
}

const DayOutOfTime: FC<DayOutOfTimeProps> = ({ monthKey, isSingleMonthScreen }) => {
    const { currentYear, handleSelectFirstDayOfTheMonth, setCurrentMonth, setCurrentYear } = useCalendarContext();
    const linkTo = useLinkTo();

    return (
        <View style={styles.day}>
            {isSingleMonthScreen ? (
                <Image source={require("@/assets/images/day-out-of-time.png")} style={styles.largeImage} />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        setCurrentYear(currentYear);
                        setCurrentMonth(monthKey || DAY_OUT_OF_TIME_KEY);
                        handleSelectFirstDayOfTheMonth(monthKey || DAY_OUT_OF_TIME_KEY, currentYear);
                        linkTo("/MonthView");
                    }}
                >
                    <Image source={require("@/assets/images/day-out-of-time.png")} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default DayOutOfTime;

const styles = StyleSheet.create({
    day: {
        padding: 0
    },
    image: {
        height: 62,
        width: "100%",
        minWidth: 100,
        marginTop: 4
    },
    largeImage: {
        height: 280,
        width: 400,
        marginTop: 4
    }
});
