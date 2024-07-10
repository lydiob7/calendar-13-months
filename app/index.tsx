import Calendar from "@/components/calendar/Calendar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import useUserGeoLocations from "@/hooks/useUserGeoLocations";
import { Platform, SafeAreaView, StatusBar } from "react-native";

export default function Index() {
    useUserGeoLocations();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <CalendarHeader />
            <Calendar />
        </SafeAreaView>
    );
}
