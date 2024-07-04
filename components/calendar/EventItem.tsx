import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";

const EventItem: FC<Event> = ({ id, title }) => {
    const themeBackground = useThemeColor({}, "background");

    return (
        <View style={[styles.container, { backgroundColor: themeBackground }]}>
            <ThemedText style={styles.title}>{title}</ThemedText>
        </View>
    );
};

export default EventItem;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8
    },
    title: {
        fontWeight: 500,
        fontSize: 16
    }
});
