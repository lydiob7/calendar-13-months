import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MonthView from "./MonthView";
import Index from "./index";
import MainDrawer from "@/components/navigation/MainDrawer";
import Settings from "./Settings";
import routes from "@/config/routes";
import Contexts from "@/context/Contexts";
import NewEventModal from "@/components/calendar/NewEventModal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Contexts>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer.Navigator drawerContent={MainDrawer} screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}>
                    <Drawer.Screen name={routes.home} component={Index} />
                    <Drawer.Screen name={routes.monthView} component={MonthView} />
                    <Drawer.Screen name={routes.settings} component={Settings} options={{ headerShown: true }} />
                </Drawer.Navigator>

                <NewEventModal />
            </GestureHandlerRootView>
        </Contexts>
    );
}
