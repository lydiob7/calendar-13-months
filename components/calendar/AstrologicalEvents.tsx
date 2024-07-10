import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useTranslationsContext } from "@/context/translationsContext";
import { useCalendarContext } from "@/context/calendarContext";
import { CustomDate, getGregorianEquivalent } from "@/utils";
import astrologicalApiService from "@/services/astrologicalApiService";
import ModalContentField from "./ModalContentField";
import { Moon } from "lunarphase-js";
import getSolarSign from "@/utils/getSolarSign";

const AstrologicalEvents = () => {
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");
    const disabledText = useThemeColor({}, "tabIconDefault");

    const [isLoadingMoonSign, setIsLoadingMoonSign] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moonSign, setMoonSign] = useState<string | null>(null);

    const { language } = useTranslationsContext();
    const { selectedDate, viewMode } = useCalendarContext();

    const currentDateString = useMemo(() => {
        if (!selectedDate) return "";

        const dateString = new CustomDate(getGregorianEquivalent(selectedDate), { withoutTime: true }).toString({
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
    }, [language, selectedDate, viewMode]);

    useEffect(() => {
        if (isModalOpen && selectedDate) {
            setIsLoadingMoonSign(true);
            astrologicalApiService
                .getMoonSignName({
                    date: selectedDate,
                    location: "PosadasMisiones,Argentina",
                    time: "12:00",
                    UTC: "-3:00"
                })
                .then((res) => setMoonSign(res.data?.Payload?.MoonSignName || null))
                .catch((err) => console.log(err))
                .finally(() => setIsLoadingMoonSign(false));
        }
    }, [isModalOpen, selectedDate]);

    const date = useMemo(
        () => (selectedDate ? new Date(`${getGregorianEquivalent(selectedDate)}T00:00:00.000Z`) : null),
        [selectedDate]
    );

    const moonPhase = useMemo(() => {
        if (!date) return { emoji: "", text: "" };
        return {
            emoji: Moon.lunarPhaseEmoji(date),
            text: Moon.lunarPhase(date)
        };
    }, [date]);

    const solarSign = useMemo(() => {
        if (!selectedDate) return "";
        return getSolarSign(selectedDate);
    }, [selectedDate]);

    const lunationNumber = useMemo(() => {
        if (!date) return "";
        return Moon.lunationNumber(date).toString();
    }, [date]);

    return (
        <>
            <Pressable onPress={() => setIsModalOpen(true)}>
                <View style={[styles.buttonWrapper, { backgroundColor: backgroundColor }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <MaterialCommunityIcons name="pentagram" size={24} color={textColor} />
                        <ThemedText style={{ color: textColor, fontSize: 18 }}>
                            {language.events.astrologicalInfoTitle}
                        </ThemedText>
                    </View>
                    <Ionicons name="chevron-forward-outline" color={textColor} size={20} />
                </View>
            </Pressable>

            <Modal
                animationType="slide"
                onRequestClose={() => setIsModalOpen(false)}
                presentationStyle="pageSheet"
                visible={isModalOpen}
            >
                <View style={[styles.modalContainer, { backgroundColor }]}>
                    <View style={[styles.header, { borderColor: disabledText }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <MaterialCommunityIcons name="pentagram" size={24} color={textColor} />
                            <ThemedText style={styles.title}>{language.events.astrologicalInfoTitle}</ThemedText>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <ThemedText style={[styles.secondaryText]}>{currentDateString}</ThemedText>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <ModalContentField
                            halfAndHalf
                            content={`${moonPhase.emoji} ${
                                language.moonPhases?.[moonPhase.text as keyof typeof language.moonPhases]
                            }`}
                            label={language.common.moonPhaseTitle}
                        />
                        <ModalContentField
                            halfAndHalf
                            content={language.astrologicalSigns?.[solarSign as keyof typeof language.astrologicalSigns]}
                            label={language.common.sunSignTitle}
                        />
                        <ModalContentField
                            halfAndHalf
                            content={
                                language.astrologicalSigns?.[
                                    moonSign?.toLowerCase() as keyof typeof language.astrologicalSigns
                                ]
                            }
                            label={language.common.moonSignTitle}
                            loading={isLoadingMoonSign}
                        />
                        <ModalContentField
                            halfAndHalf
                            content={lunationNumber}
                            label={language.common.luntationTitle}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default AstrologicalEvents;

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: 12,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 1
        }
    },
    content: {
        paddingVertical: 12
    },
    modalContainer: {
        flex: 1,
        padding: 16
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    secondaryText: {
        fontSize: 14
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    }
});
