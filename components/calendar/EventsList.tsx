import React, { FC, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslationsContext } from "@/context/translationsContext";
import EventItem from "./EventItem";
import { useCalendarContext } from "@/context/calendarContext";
import Event from "@/types/Event";
import mainApiService from "@/services/mainApiService";

const EventsList = () => {
    const { language } = useTranslationsContext();
    const { selectedDate } = useCalendarContext();

    const [data, setData] = useState<Event[]>([]);

    useEffect(() => {
        if (selectedDate) mainApiService.getDayEvents(selectedDate).then((res) => setData(res));
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            {!!data.length ? (
                <FlatList
                    data={data}
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
