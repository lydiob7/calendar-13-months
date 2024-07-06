import React, { FC, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate } from "@/utils";

interface ModalContentFieldProps {
    label: string;
    content: string;
}

const ModalContentField: FC<ModalContentFieldProps> = ({ content, label }) => {
    return (
        <View style={styles.contentField}>
            <ThemedText style={{ fontWeight: 600, width: 80 }}>{label}</ThemedText>
            <ThemedText style={styles.fieldContent}>{content}</ThemedText>
        </View>
    );
};

interface EventModalProps {
    event: Event;
    isModalOpen: boolean;
    onClose: () => void;
}

const EventModal: FC<EventModalProps> = ({ event: calendarEvent, isModalOpen, onClose }) => {
    const { schedule, title, type: eventType } = calendarEvent;

    const disabledText = useThemeColor({}, "tabIconDefault");
    const { language } = useTranslationsContext();

    const { viewMode } = useCalendarContext();

    const isMultipleDaysEvent = useMemo(() => {
        return new Set([schedule.starts.date, schedule.ends.date]).size > 1;
    }, [schedule]);

    const startsDateString = useMemo(() => {
        const dateString = new CustomDate(schedule.starts.date, { withoutTime: true }).toString({
            type: viewMode
        });
        return dateString
            .split(" ")
            .map((word, i) => {
                if (i === 0) return language.daysOfTheWeek.full[word as keyof typeof language.daysOfTheWeek.full];
                if (i === 1) return language.months[word as keyof typeof language.months];
                return word;
            })
            .join(" ");
    }, [schedule, viewMode]);

    const endsDateString = useMemo(() => {
        const dateString = new CustomDate(schedule.ends.date, { withoutTime: true }).toString({
            type: viewMode
        });
        return dateString
            .split(" ")
            .map((word, i) => {
                if (i === 0) return language.daysOfTheWeek.full[word as keyof typeof language.daysOfTheWeek.full];
                if (i === 1) return language.months[word as keyof typeof language.months];
                return word;
            })
            .join(" ");
    }, [schedule, viewMode]);

    return (
        <Modal animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet" visible={isModalOpen}>
            <View style={styles.container}>
                <View style={[styles.header, { borderColor: disabledText }]}>
                    <ThemedText style={styles.title}>{title}</ThemedText>
                    <View style={{ marginTop: 12 }}>
                        {isMultipleDaysEvent || !schedule.allDay ? (
                            <>
                                <ThemedText style={[styles.secondaryText, { color: disabledText }]}>
                                    {language.common.fromTitle} {schedule.starts.time} {startsDateString}
                                </ThemedText>
                                <ThemedText style={[styles.secondaryText, { color: disabledText }]}>
                                    {language.common.toTitle} {schedule.ends.time} {endsDateString}
                                </ThemedText>
                            </>
                        ) : (
                            <ThemedText style={[styles.secondaryText, { color: disabledText }]}>
                                {startsDateString}
                            </ThemedText>
                        )}
                        {schedule.allDay && (
                            <ThemedText style={[styles.secondaryText, { color: disabledText }]}>
                                {language.common.allDayTitle}
                            </ThemedText>
                        )}
                    </View>
                </View>

                <View style={styles.content}>
                    {eventType === "custom" && calendarEvent.location && (
                        <ModalContentField content={calendarEvent.location} label={language.events.locationTitle} />
                    )}
                    {eventType === "custom" && calendarEvent.notes && (
                        <ModalContentField content={calendarEvent.notes} label={language.events.notesTitle} />
                    )}
                    {eventType === "custom" && calendarEvent.url && (
                        <ModalContentField content={calendarEvent.url} label={language.events.urlTitle} />
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default EventModal;

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    content: {
        paddingVertical: 12
    },
    contentField: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 8
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    fieldContent: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    },
    secondaryText: {
        fontSize: 14
    }
});
