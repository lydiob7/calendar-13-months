import React, { FC, useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate } from "@/utils";
import ModalContentField from "./ModalContentField";
import Hemisphere from "@/types/Hemisphere";

interface EventModalProps {
    event: Event;
    isModalOpen: boolean;
    onClose: () => void;
}

const EventModal: FC<EventModalProps> = ({ event: calendarEvent, isModalOpen, onClose }) => {
    const { schedule, title, type: eventType } = calendarEvent;

    const backgroundColor = useThemeColor({}, "background");
    const disabledText = useThemeColor({}, "tabIconDefault");
    const { language } = useTranslationsContext();

    const { hemisphere, viewMode } = useCalendarContext();

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
    }, [language, schedule, viewMode]);

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
    }, [language, schedule, viewMode]);

    const solarEventMoreInfo = useMemo(() => {
        if (!hemisphere || eventType !== "solar-event") return "";
        const eventTitle = calendarEvent.title as keyof typeof language.solarEventsMoreInfo.southern;
        return language.solarEventsMoreInfo[hemisphere][eventTitle];
    }, [calendarEvent, hemisphere, language]);

    return (
        <Modal animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet" visible={isModalOpen}>
            <View style={[styles.container, { backgroundColor }]}>
                <View style={[styles.header, { borderColor: disabledText }]}>
                    <ThemedText style={styles.title}>
                        {calendarEvent.type === "moon-phase" &&
                            `${calendarEvent.phaseEmoji} ${
                                language.moonPhases?.[title as keyof typeof language.moonPhases]
                            }`}
                        {calendarEvent.type === "solar-event" &&
                            `☀️ ${language.solarEvents?.[title as keyof typeof language.solarEvents]}`}
                        {calendarEvent.type === "custom" && title}
                    </ThemedText>
                    <View style={{ marginTop: 12 }}>
                        {(isMultipleDaysEvent || !schedule.allDay) && !schedule.punctualEvent ? (
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
                                {startsDateString} {schedule.punctualEvent ? schedule.starts.time : ""}
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
                    {eventType === "solar-event" && <ThemedText>{solarEventMoreInfo}</ThemedText>}
                </View>
            </View>
        </Modal>
    );
};

export default EventModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    content: {
        paddingVertical: 12
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    },
    secondaryText: {
        fontSize: 14
    }
});
