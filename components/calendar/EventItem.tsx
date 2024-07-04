import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";

const EventItem: FC<Event> = ({ id, title }) => {
    return (
        <View style={styles.container}>
            <ThemedText>{title}</ThemedText>
        </View>
    );
};

export default EventItem;

const styles = StyleSheet.create({
    container: {}
});
