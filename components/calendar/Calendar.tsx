import React from "react";
import Year from "./Year";
import CalendarContextProvider from "@/context/calendarContext";
import { ScrollView, StyleSheet } from "react-native";
import CalendarHeader from "./CalendarHeader";

const Calendar = () => {
    return (
        <CalendarContextProvider>
            <ScrollView style={styles.container}>
                <CalendarHeader />
                <Year />
            </ScrollView>
        </CalendarContextProvider>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    }
});
