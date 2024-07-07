import Calendar from "@/components/calendar/Calendar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthViewScreen from "@/components/calendar/MonthViewScreen";
import { useCalendarContext } from "@/context/calendarContext";
import useUserGeoLocations from "@/hooks/useUserGeoLocations";
import { SafeAreaView } from "react-native";

export default function Index() {
    const { currentMonth } = useCalendarContext();
    useUserGeoLocations();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CalendarHeader />
            {!currentMonth && <Calendar />}
            {currentMonth && <MonthViewScreen />}
        </SafeAreaView>
    );
}
