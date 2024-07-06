import React, { FC, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { getGregorianEquivalent } from "@/utils";
import EventModal from "./EventModal";

const EventItem: FC<Event> = (calendarEvent) => {
    const { schedule, title } = calendarEvent;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const disabledText = useThemeColor({}, "tabIconDefault");
    const themeBackground = useThemeColor({}, "background");
    const tintColor = useThemeColor({}, "tabIconSelected");
    const { language } = useTranslationsContext();

    const { selectedDate } = useCalendarContext();

    const isMultipleDaysEvent = useMemo(() => {
        return new Set([schedule.starts.date, schedule.ends.date]).size > 1;
    }, [schedule]);

    const isStartDay = useMemo(() => {
        if (!selectedDate) return false;
        return getGregorianEquivalent(selectedDate) === schedule.starts.date;
    }, [schedule, selectedDate?.date]);

    const isEndDay = useMemo(() => {
        if (!selectedDate) return false;
        return getGregorianEquivalent(selectedDate) === schedule.ends.date;
    }, [schedule, selectedDate?.date]);

    return (
        <>
            <Pressable onPress={() => setIsModalOpen(true)}>
                <View style={[styles.container, { backgroundColor: themeBackground }]}>
                    <View style={[styles.leftSide, { borderLeftColor: tintColor }]}>
                        <ThemedText numberOfLines={1} style={[styles.title, { maxWidth: 250 }]}>
                            {title}
                        </ThemedText>
                        {calendarEvent.type === "custom" && calendarEvent.location && (
                            <ThemedText
                                numberOfLines={1}
                                style={[styles.secondaryText, { color: disabledText, maxWidth: 250 }]}
                            >
                                {calendarEvent.location}
                            </ThemedText>
                        )}
                    </View>
                    <View style={styles.rightSide}>
                        {schedule.allDay || (isMultipleDaysEvent && !isStartDay && !isEndDay) ? (
                            <ThemedText style={styles.secondaryText}>{language.common.allDayTitle}</ThemedText>
                        ) : (
                            <>
                                {(!isMultipleDaysEvent || isStartDay) && (
                                    <ThemedText style={styles.secondaryText}>{schedule.starts?.time}</ThemedText>
                                )}
                                {(!isMultipleDaysEvent || isEndDay) && (
                                    <ThemedText style={[styles.secondaryText, { color: disabledText }]}>
                                        {schedule.ends?.time}
                                    </ThemedText>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </Pressable>

            <EventModal event={calendarEvent} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default EventItem;

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 1
        }
    },
    leftSide: {
        borderLeftWidth: 4,
        paddingLeft: 12,
        paddingVertical: 8,
        height: "100%"
    },
    rightSide: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    secondaryText: {
        fontSize: 14,
        textAlign: "right"
    },
    title: {
        fontWeight: 500,
        fontSize: 16
    }
});
