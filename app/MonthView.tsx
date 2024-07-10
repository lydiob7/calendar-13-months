import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthViewScreen from "@/components/calendar/MonthViewScreen";
import { Platform, SafeAreaView, StatusBar } from "react-native";

const MonthView = () => {
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
            <MonthViewScreen />
        </SafeAreaView>
    );
};

export default MonthView;
