import { useCalendarContext } from "@/context/calendarContext";
import React, { FC, useCallback } from "react";
import { Dimensions, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { toggleCurrentMonthViewMode } from "@/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTranslationsContext } from "@/context/translationsContext";
import routes from "@/config/routes";

const MainDrawer: FC<DrawerContentComponentProps> = ({ navigation }) => {
    const textColor = useThemeColor({}, "text");
    const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
    const tabIconSelectedColor = useThemeColor({}, "tabIconSelected");

    const { language } = useTranslationsContext();

    const {
        currentMonth,
        currentYear,
        handleSelectFirstDayOfTheMonth,
        handleSelectDate,
        selectedDate,
        setCurrentMonth,
        setCurrentYear,
        setViewMode,
        today,
        viewMode
    } = useCalendarContext();

    const handleNavigateToMonthView = useCallback(() => {
        if (!currentMonth) {
            setCurrentYear(currentYear);
            const monthToGo =
                today.getFullYear() === currentYear
                    ? today.getMonthString({ type: viewMode })
                    : viewMode === "gregorian"
                    ? "january"
                    : "phussa";
            setCurrentMonth(monthToGo);
            handleSelectFirstDayOfTheMonth(monthToGo, currentYear);
        }
        navigation.navigate(routes.monthView);
    }, [currentMonth, currentYear, today, viewMode]);

    const handleNavigateToYearView = useCallback(() => {
        setCurrentMonth(null);
        navigation.navigate(routes.home);
    }, []);

    const toggleCalendarMode = useCallback(() => {
        if (currentMonth && selectedDate) {
            const newSelectedDate = toggleCurrentMonthViewMode(selectedDate);
            setCurrentYear(newSelectedDate.year);
            setCurrentMonth(newSelectedDate.month);
            handleSelectDate(newSelectedDate);
        }
        setViewMode((prev) => (prev === "fixed" ? "gregorian" : "fixed"));
        navigation.closeDrawer();
    }, [currentMonth, handleSelectDate, selectedDate]);

    return (
        <SafeAreaView style={styles.drawerContainer}>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "column",
                        padding: 16,
                        height: Dimensions.get("window").height
                    }}
                >
                    <View style={[styles.navigationHeader, { borderBottomColor: tabIconDefaultColor }]}>
                        <ThemedText style={styles.appName}>13 Month Calendar</ThemedText>
                    </View>
                    <View style={styles.navigationContainer}>
                        <Pressable onPress={handleNavigateToYearView} style={styles.menuItem}>
                            <MaterialCommunityIcons
                                name="grid"
                                size={26}
                                color={!currentMonth ? tabIconSelectedColor : textColor}
                            />
                            <ThemedText
                                style={[
                                    styles.menuItemText,
                                    { color: !currentMonth ? tabIconSelectedColor : textColor }
                                ]}
                            >
                                {language.navigationMenu.yearView}
                            </ThemedText>
                        </Pressable>
                        <Pressable onPress={handleNavigateToMonthView} style={styles.menuItem}>
                            <MaterialCommunityIcons
                                name="calendar-month-outline"
                                size={26}
                                color={currentMonth ? tabIconSelectedColor : textColor}
                            />
                            <ThemedText
                                style={[
                                    styles.menuItemText,
                                    { color: currentMonth ? tabIconSelectedColor : textColor }
                                ]}
                            >
                                {language.navigationMenu.monthView}
                            </ThemedText>
                        </Pressable>
                        <Pressable onPress={toggleCalendarMode} style={styles.menuItem}>
                            <MaterialCommunityIcons name="cached" size={26} color={textColor} />
                            <ThemedText style={[styles.menuItemText, { color: textColor }]}>
                                {language.navigationMenu.toggleView}
                            </ThemedText>
                        </Pressable>
                    </View>

                    <View style={[styles.navigationFooter, { borderTopColor: tabIconDefaultColor }]}>
                        <Pressable onPress={() => navigation.navigate(routes.settings)} style={styles.menuItem}>
                            <Ionicons name="settings-outline" size={26} color={textColor} />
                            <ThemedText style={[styles.menuItemText, { color: textColor }]}>
                                {language.navigationMenu.settings}
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainDrawer;

const styles = StyleSheet.create({
    appName: {
        fontSize: 20,
        fontWeight: 500
    },
    drawerContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 12
    },
    menuItemText: {
        fontSize: 16
    },
    navigationContainer: {
        flex: 1
    },
    navigationFooter: {
        borderTopWidth: 1,
        paddingVertical: 16
    },
    navigationHeader: {
        borderBottomWidth: 1,
        paddingBottom: 16
    }
});
