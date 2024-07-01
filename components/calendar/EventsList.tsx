import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

const EventsList = () => {
    return (
        <View style={styles.container}>
            <ThemedText>Events</ThemedText>
        </View>
    );
};

export default EventsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "auto",
        paddingHorizontal: 16,
        marginTop: 12
    }
});
