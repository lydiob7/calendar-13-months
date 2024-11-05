import React, { FC, ReactNode } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider as RNThemeProvider } from "@react-navigation/native";
import { useUserSettingsContext } from "./userSettingsContext";

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const { userColorScheme } = useUserSettingsContext();

    return <RNThemeProvider value={userColorScheme === "dark" ? DarkTheme : DefaultTheme}>{children}</RNThemeProvider>;
};

export default ThemeProvider;
