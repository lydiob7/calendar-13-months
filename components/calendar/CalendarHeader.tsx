import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import { Colors } from "@/constants/Colors";

interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = () => {
    const { currentYear, today, viewMode } = useCalendarContext();

    const isCurrentYear = today.getFullYear() === currentYear;

    const handlePressYear = () => {};

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePressYear}>
                <ThemedText
                    style={{
                        ...styles.yearTitle,
                        ...(isCurrentYear ? styles.currentYear : {})
                    }}
                >
                    {currentYear}
                </ThemedText>
            </Pressable>
        </View>
    );
};

export default CalendarHeader;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    },
    currentYear: {
        color: Colors.dark.tint
    },
    yearTitle: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 32
    }
});
