import React from "react";
import Year from "./Year";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCalendarContext } from "@/context/calendarContext";

const Calendar = () => {
    const { setPreventAutomaticDaySelect } = useCalendarContext();

    useFocusEffect(() => {
        setPreventAutomaticDaySelect(false);
    });

    return (
        <View style={styles.viewWrapper}>
            <ScrollView style={styles.container}>
                <Year />
            </ScrollView>
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    },
    viewWrapper: {
        flex: 1
    }
});
