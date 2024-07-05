import React, { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Event from "@/types/Event";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { getGregorianEquivalent } from "@/utils";

const EventItem: FC<Event> = ({ id, schedule, title }) => {
    const disabledText = useThemeColor({}, "tabIconDefault");
    const themeBackground = useThemeColor({}, "background");
    const tintColor = useThemeColor({}, "tabIconSelected");
    const { language } = useTranslationsContext();

    const { selectedDate } = useCalendarContext();

    const isMultipleDaysEvent = useMemo(() => {
        return new Set([schedule.starts.date, schedule.ends.date]).size > 0;
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
    time: {
        fontSize: 14,
        textAlign: "right"
    },
    title: {
        fontWeight: 500,
        fontSize: 16
    }
});
