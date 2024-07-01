import Calendar from "@/components/calendar/Calendar";
import { SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Calendar />
        </SafeAreaView>
    );
}
