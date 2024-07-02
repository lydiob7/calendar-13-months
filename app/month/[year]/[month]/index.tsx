import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import GregorianMonth from "@/types/GregorianMonth";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import MonthViewScreen from "@/components/calendar/MonthViewScreen";
import language from "@/config/languages";

export default function MonthView() {
    const { month, year } = useLocalSearchParams<{ month: GregorianMonth | FixedCalendarMonth; year: string }>();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Stack.Screen
                options={{
                    title: `${month ? language.months[month] : "Month"} ${year}`
                }}
            />
            <MonthViewScreen month={month} year={year} />
        </SafeAreaView>
    );
}
