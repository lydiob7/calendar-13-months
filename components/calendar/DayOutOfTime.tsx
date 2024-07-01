import React, { FC } from "react";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";

const DayOutOfTime = () => {
    return <ThemedText style={styles.day}>1</ThemedText>;
};

export default DayOutOfTime;

const styles = StyleSheet.create({
    day: {
        padding: 0,
        fontSize: 10
    }
});
