import React, { FC, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate, getGregorianEquivalent } from "@/utils";

const EventItem: FC<Event> = ({ id, schedule, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const disabledText = useThemeColor({}, "tabIconDefault");
    const themeBackground = useThemeColor({}, "background");
    const tintColor = useThemeColor({}, "tabIconSelected");
    const { language } = useTranslationsContext();

    const { selectedDate, viewMode } = useCalendarContext();

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
        <>
            <Pressable onPress={() => setIsModalOpen(true)}>
                <View style={[styles.container, { backgroundColor: themeBackground }]}>
                    <View style={[styles.leftSide, { borderLeftColor: tintColor }]}>
                        <ThemedText style={styles.title}>{title}</ThemedText>
                    </View>
                    <View style={styles.rightSide}>
                        {schedule.allDay || (isMultipleDaysEvent && !isStartDay && !isEndDay) ? (
                            <ThemedText style={styles.time}>{language.common.allDayTitle}</ThemedText>
                        ) : (
                            <>
                                {(!isMultipleDaysEvent || isStartDay) && (
                                    <ThemedText style={styles.time}>{schedule.starts?.time}</ThemedText>
                                )}
                                {(!isMultipleDaysEvent || isEndDay) && (
                                    <ThemedText style={[styles.time, { color: disabledText }]}>
                                        {schedule.ends?.time}
                                    </ThemedText>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </Pressable>

            <Modal
                animationType="slide"
                onRequestClose={() => setIsModalOpen(false)}
                presentationStyle="pageSheet"
                visible={isModalOpen}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalHeader, { borderColor: disabledText }]}>
                        <ThemedText style={styles.modalTitle}>{title}</ThemedText>
                        <View style={{ marginTop: 12 }}>
                            {isMultipleDaysEvent || !schedule.allDay ? (
                                <>
                                    <ThemedText style={[styles.modalSecondaryText, { color: disabledText }]}>
                                        {language.common.fromTitle} {schedule.starts.time} {startsDateString}
                                    </ThemedText>
                                    <ThemedText style={[styles.modalSecondaryText, { color: disabledText }]}>
                                        {language.common.toTitle} {schedule.ends.time} {endsDateString}
                                    </ThemedText>
                                </>
                            ) : (
                                <ThemedText style={[styles.modalSecondaryText, { color: disabledText }]}>
                                    {startsDateString}
                                </ThemedText>
                            )}
                            {schedule.allDay && (
                                <ThemedText style={[styles.modalSecondaryText, { color: disabledText }]}>
                                    {language.common.allDayTitle}
                                </ThemedText>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        padding: 16
    },
    modalHeader: {
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 500
    },
    modalSecondaryText: {
        fontSize: 14
    },
    rightSide: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    time: {
        fontSize: 14,
        textAlign: "right"
    },
    title: {
        fontWeight: 500,
        fontSize: 16
    }
});
