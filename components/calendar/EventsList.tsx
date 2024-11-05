import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslationsContext } from "@/context/translationsContext";
import EventItem from "./EventItem";
import AstrologicalEvents from "./AstrologicalEvents";
import { useEventsContext } from "@/context/eventsContext";

const EventsList = () => {
    const { language } = useTranslationsContext();

    const { dayEvents } = useEventsContext();

    return (
        <View style={styles.container}>
            <AstrologicalEvents />
            {!!dayEvents.length ? (
                <FlatList
                    data={dayEvents}
                    style={styles.eventsList}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    renderItem={({ item }) => <EventItem {...item} />}
                />
            ) : (
                <ThemedText style={styles.noEvents}>{language.common.noEventsTitle}</ThemedText>
            )}
        </View>
    );
};

export default EventsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "auto",
        paddingHorizontal: 4,
        marginTop: 16
    },
    eventsList: {
        marginVertical: 8
    },
    noEvents: {
        fontSize: 18,
        fontWeight: 500,
        textAlign: "center",
        marginTop: 20
    }
});
