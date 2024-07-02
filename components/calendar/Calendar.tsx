import React from "react";
import Year from "./Year";
import { ScrollView, StyleSheet, View } from "react-native";
import CalendarHeader from "./CalendarHeader";

const Calendar = () => {
    return (
        <View style={styles.viewWrapper}>
            <CalendarHeader />
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
