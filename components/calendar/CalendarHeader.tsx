import React, { FC, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { fixedCalendarMonthsMap, gregorianMonths } from "@/utils";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";

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
        handleSelectToday,
        setCurrentMonth,
        setCurrentYear,
        setPreventAutomaticDaySelect,
        setViewMode,
        today,
        viewMode
    } = useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear().toString() === currentYear.toString(),
        [currentYear, today]
    );

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleCalendarMode = () => {
        setViewMode((prev) => (prev === "fixed" ? "gregorian" : "fixed"));
    };

    const navigateToToday = () => {
        setCurrentYear(today.getFullYear());
        setCurrentMonth(
            viewMode === "gregorian"
                ? gregorianMonths[today.getMonth({ type: viewMode })]
                : fixedCalendarMonthsMap[today.getMonth({ type: viewMode })]
        );
        setPreventAutomaticDaySelect(true);
        handleSelectToday();
    };

    return (
        <>
            <View style={styles.container}>
                {currentMonth ? (
                    <ThemedText>
                        {language.months[currentMonth]} {currentYear}
                    </ThemedText>
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
                                {Array.from(Array(5000).keys()).map((year) => (
                                    <Picker.Item
                                        key={year}
                                        label={year.toString()}
                                        value={year}
                                        color={currentYear === year ? tabIconSelectedColor : textColor}
                                        style={styles.yearTitle}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )}

                <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                    {!currentMonth && (
                        <Pressable
                            onPress={() => {
                                toggleCalendarMode();
                                setCurrentMonth(null);
                            }}
                        >
                            <MaterialCommunityIcons name="cached" size={26} color={tabIconDefaultColor} />
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() => {
                            setCurrentMonth(null);
                        }}
                    >
                        <MaterialCommunityIcons
                            name="calendar-month-outline"
                            size={26}
                            color={!currentMonth ? tabIconSelectedColor : tabIconDefaultColor}
                        />
                    </Pressable>
                    <Pressable onPress={navigateToToday}>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={26}
                            color={currentMonth ? tabIconSelectedColor : tabIconDefaultColor}
                        />
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
        paddingTop: 10,
        paddingHorizontal: 10,
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
        left: 0,
        width: 500,
        height: 1200,
        zIndex: 3,
        backgroundColor: "transparent"
    },
    modalWrapper: {
        position: "relative",
        width: 250,
        top: 48,
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
