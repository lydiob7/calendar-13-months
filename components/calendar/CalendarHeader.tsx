import React, { FC, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { calculateNextMonth, calculatePreviousMonth } from "@/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useEventsContext } from "@/context/eventsContext";

interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = () => {
    const { language } = useTranslationsContext();

    const backgroundColor = useThemeColor({}, "background");
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const tabIconSelectedColor = useThemeColor({}, "tabIconSelected");
    const textColor = useThemeColor({}, "text");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {
        currentMonth,
        currentYear,
        handleSelectFirstDayOfTheMonth,
        handleSelectToday,
        setCurrentMonth,
        setCurrentYear,
        today
    } = useCalendarContext();

    const { handleToggleNewEventModal } = useEventsContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear().toString() === currentYear.toString(),
        [currentYear, today]
    );

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleGoToPreviousMonth = useCallback(() => {
        if (!currentMonth) return;
        const { month, year } = calculatePreviousMonth({ currentMonth, currentYear });
        setCurrentYear(year);
        setCurrentMonth(month);
        handleSelectFirstDayOfTheMonth(month, year);
    }, [currentMonth, currentYear, handleSelectFirstDayOfTheMonth]);

    const handleGoToNextMonth = useCallback(() => {
        if (!currentMonth) return;
        const { month, year } = calculateNextMonth({ currentMonth, currentYear });
        setCurrentYear(year);
        setCurrentMonth(month);
        handleSelectFirstDayOfTheMonth(month, year);
    }, [currentMonth, currentYear, handleSelectFirstDayOfTheMonth]);

    return (
        <>
            <View style={styles.container}>
                <DrawerToggleButton />
                {currentMonth ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Pressable onPress={handleGoToPreviousMonth}>
                            <Ionicons color={textColor} name="chevron-back-outline" size={20} />
                        </Pressable>
                        <ThemedText style={{ minWidth: 153, textAlign: "center" }}>
                            {language.months[currentMonth]} {currentYear}
                        </ThemedText>
                        <Pressable onPress={handleGoToNextMonth}>
                            <Ionicons color={textColor} name="chevron-forward-outline" size={20} />
                        </Pressable>
                    </View>
                ) : (
                    <Pressable onPress={toggleDropdown}>
                        <View style={styles.yearDropdown}>
                            <ThemedText
                                style={[
                                    styles.yearTitle,
                                    { color: textColor },
                                    isCurrentYear && { color: tabIconSelectedColor }
                                ]}
                            >
                                {currentYear}
                            </ThemedText>
                            <Ionicons
                                name="chevron-down-outline"
                                color={isCurrentYear ? tabIconSelectedColor : textColor}
                                size={20}
                                style={isDropdownOpen && styles.rotateIcon}
                            />
                        </View>
                    </Pressable>
                )}
                {isDropdownOpen && (
                    <View style={styles.yearPicker}>
                        <Pressable onPress={toggleDropdown}>
                            <View style={styles.modalBackdrop} />
                        </Pressable>
                        <View style={[styles.modalWrapper, { backgroundColor: backgroundColor }]}>
                            <Picker
                                selectedValue={currentYear}
                                onValueChange={(itemValue, itemIndex) => setCurrentYear(itemValue)}
                            >
                                {Array.from(Array(5000 - 1754).keys()).map((year) => (
                                    <Picker.Item
                                        key={year}
                                        label={(year + 1754).toString()}
                                        value={year + 1754}
                                        color={currentYear === year + 1754 ? tabIconSelectedColor : textColor}
                                        style={styles.yearTitle}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )}

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                    <Pressable onPress={handleSelectToday}>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={26}
                            color={currentMonth ? tabIconSelectedColor : tabIconDefaultColor}
                        />
                    </Pressable>
                    <Pressable onPress={handleToggleNewEventModal}>
                        <MaterialCommunityIcons name="plus" size={26} color={tabIconSelectedColor} />
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default CalendarHeader;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        zIndex: 3,
        paddingTop: 12,
        paddingRight: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dropdownIcon: {},
    pickerItem: {},
    rotateIcon: {
        transform: "rotate(180deg)"
    },
    modalBackdrop: {
        position: "absolute",
        top: 0,
        width: 500,
        height: 1200,
        zIndex: 3,
        backgroundColor: "transparent"
    },
    modalWrapper: {
        position: "relative",
        width: 250,
        top: 48,
        left: "25%",
        zIndex: 4
    },
    yearDropdown: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    yearPicker: {
        position: "absolute",
        zIndex: 3
    },
    yearTitle: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 32,
        paddingHorizontal: 2,
        textAlign: "center"
    }
});
