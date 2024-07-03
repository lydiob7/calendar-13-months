import { useCalendarContext } from "@/context/calendarContext";
import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface DayOutOfTimeProps {
    isSingleMonthScreen?: boolean;
}

const DayOutOfTime: FC<DayOutOfTimeProps> = ({ isSingleMonthScreen }) => {
    const { currentYear, setCurrentMonth, setCurrentYear } = useCalendarContext();

    return (
        <View style={styles.day}>
            {isSingleMonthScreen ? (
                <Image source={require("@/assets/images/day-out-of-time.png")} style={styles.largeImage} />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        setCurrentYear(currentYear);
                        setCurrentMonth("day-out-of-time");
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
        flex: 1,
        padding: 0
    },
    image: {
        height: 62,
        width: "100%",
        marginTop: 4
    },
    largeImage: {
        height: 300,
        width: 400,
        marginTop: 4
    }
});
