import React, { FC, ReactNode } from "react";

import CalendarContextProvider from "@/context/calendarContext";
import TranslationsContextProvider from "@/context/translationsContext";
import UserSettingsContextProvider from "./userSettingsContext";
import EventsContextProvider from "./eventsContext";
import ThemeProvider from "./ThemeProvider";

interface ContextsProps {
    children: ReactNode;
}

const Contexts: FC<ContextsProps> = ({ children }) => {
    return (
        <UserSettingsContextProvider>
            <ThemeProvider>
                <TranslationsContextProvider>
                    <CalendarContextProvider>
                        <EventsContextProvider>{children}</EventsContextProvider>
                    </CalendarContextProvider>
                </TranslationsContextProvider>
            </ThemeProvider>
        </UserSettingsContextProvider>
    );
};

export default Contexts;
