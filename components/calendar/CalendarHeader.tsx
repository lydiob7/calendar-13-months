import React, { FC } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useCalendarContext } from "@/context/calendarContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";

interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = () => {
    const { currentYear, setCurrentYear, setViewMode, today, viewMode } = useCalendarContext();

    const isCurrentYear = today.getFullYear() === currentYear;
    const isEnabled = viewMode === "fixed";

    const toggleCalendarMode = () => {
        setViewMode((curr) => (curr === "fixed" ? "gregorian" : "fixed"));
    };

    return (
        <>
            <View style={styles.container}>
                <View style={{ backgroundColor: Colors.dark.background, width: 250 }}>
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
        paddingTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dropdownIcon: {},
    pickerItem: {},
    yearPicker: {
        flex: 1,
        maxWidth: 200
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
