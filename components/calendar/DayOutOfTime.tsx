import { useCalendarContext } from "@/context/calendarContext";
import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface DayOutOfTimeProps {
    monthKey?: "day-out-of-time" | "leap-day";
    isSingleMonthScreen?: boolean;
}

const DayOutOfTime: FC<DayOutOfTimeProps> = ({ monthKey, isSingleMonthScreen }) => {
    const { currentYear, setCurrentMonth, setCurrentYear } = useCalendarContext();

    return (
        <View style={styles.day}>
            {isSingleMonthScreen ? (
                <Image source={require("@/assets/images/day-out-of-time.png")} style={styles.largeImage} />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        setCurrentYear(currentYear);
                        setCurrentMonth(monthKey || "day-out-of-time");
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
