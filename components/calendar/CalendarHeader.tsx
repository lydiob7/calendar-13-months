import React, { FC, useMemo, useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { currentYear, setCurrentYear, setViewMode, today, viewMode } = useCalendarContext();

    const isCurrentYear = useMemo(
        () => today.getFullYear().toString() === currentYear.toString(),
        [currentYear, today]
    );
    const isEnabled = useMemo(() => viewMode === "fixed", [viewMode]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleCalendarMode = () => {
        setViewMode((curr) => (curr === "fixed" ? "gregorian" : "fixed"));
    };

    return (
        <>
            <View style={styles.container}>
                <Pressable onPress={toggleDropdown}>
                    <View style={styles.yearDropdown}>
                        <ThemedText style={[styles.yearTitle, isCurrentYear && styles.currentYear]}>
                            {currentYear}
                        </ThemedText>
                        <Ionicons
                            name="chevron-down-outline"
                            color={isCurrentYear ? Colors.dark.tint : "white"}
                            size={20}
                            style={isDropdownOpen && styles.rotateIcon}
                        />
                    </View>
                </Pressable>
                {isDropdownOpen && (
                    <View style={styles.yearPicker}>
                        <Picker
                            selectedValue={currentYear}
                            onValueChange={(itemValue, itemIndex) => setCurrentYear(itemValue)}
                        >
                            {Array.from(Array(5000).keys()).map((year) => (
                                <Picker.Item
                                    key={year}
                                    label={year.toString()}
                                    value={year}
                                    color={currentYear === year ? Colors.dark.tint : "#fff"}
                                    style={styles.yearTitle}
                                />
                            ))}
                        </Picker>
                    </View>
                )}

                <View>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.dark.tint }}
                        thumbColor="#f4f3f4"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleCalendarMode}
                        value={isEnabled}
                    />
                </View>
            </View>
        </>
    );
};

export default CalendarHeader;

const styles = StyleSheet.create({
    container: {
        zIndex: 3,
        paddingTop: 10,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    currentYear: {
        color: Colors.dark.tint
    },
    dropdownIcon: {},
    pickerItem: {},
    rotateIcon: {
        transform: "rotate(180deg)"
    },
    yearDropdown: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    yearPicker: {
        position: "absolute",
        zIndex: 3,
        backgroundColor: Colors.dark.background,
        width: 250,
        top: 48
    },
    yearTitle: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 32,
        paddingHorizontal: 2,
        textAlign: "center"
    }
});
