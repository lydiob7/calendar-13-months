import mainApiService from "@/services/mainApiService";
import Event, { CustomEvent } from "@/types/Event";
import SelectedDate from "@/types/SelectedDate";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCalendarContext } from "./calendarContext";
import { DAY_OUT_OF_TIME_KEY, LEAP_DAY_KEY } from "@/utils";

interface EventsContextProps {
    dayEvents: Event[];
    handleCreateNewEvent: (newEvent: CustomEvent) => Promise<void>;
    handleToggleNewEventModal: () => void;
    isNewEventModalOpen: boolean;
    monthEvents: string[];
}

const EventsContext = createContext<EventsContextProps | undefined>(undefined);

const EventsContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentMonth, currentYear, monthDays, selectedDate } = useCalendarContext();

    const [dayEvents, setDayEvents] = useState<Event[]>([]);
    const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
    const [monthEvents, setMonthEvents] = useState<string[]>([]);

    const handleGetDayEvents = useCallback((selectedDate: SelectedDate) => {
        mainApiService.getDayEvents(selectedDate).then((res) => setDayEvents(res));
    }, []);

    const handleGetMonthEvents = useCallback(
        (month: typeof currentMonth) => {
            if (!month) return;
            const isLooseDay = month === LEAP_DAY_KEY || month === DAY_OUT_OF_TIME_KEY;
            mainApiService
                .getRangeEvents({
                    startDate: {
                        date: 1,
                        month,
                        year: currentYear
                    },
                    endDate: {
                        date: isLooseDay ? 1 : monthDays,
                        month,
                        year: currentYear
                    }
                })
                .then((response) => setMonthEvents(response));
        },
        [currentYear, monthDays]
    );

    const handleCreateNewEvent = useCallback(
        async (newEvent: CustomEvent) => {
            const success = await mainApiService.createEvent(newEvent);
            if (success) {
                if (selectedDate) handleGetDayEvents(selectedDate);
                handleGetMonthEvents(currentMonth);
            }
        },
        [currentMonth, handleGetDayEvents, handleGetMonthEvents, selectedDate]
    );

    const handleToggleNewEventModal = useCallback(() => {
        setIsNewEventModalOpen((b) => !b);
    }, []);

    useEffect(() => {
        if (selectedDate) handleGetDayEvents(selectedDate);
    }, [handleGetDayEvents, selectedDate]);

    useEffect(() => {
        handleGetMonthEvents(currentMonth);
    }, [currentMonth, handleGetMonthEvents]);

    const values = useMemo(
        () => ({ dayEvents, handleCreateNewEvent, handleToggleNewEventModal, isNewEventModalOpen, monthEvents }),
        [dayEvents, handleCreateNewEvent, handleToggleNewEventModal, isNewEventModalOpen, monthEvents]
    );

    return <EventsContext.Provider value={values}>{children}</EventsContext.Provider>;
};

export default EventsContextProvider;

export function useEventsContext() {
    const context = useContext(EventsContext);

    if (!context) throw new Error("useEventsContext should be used inside of Events Context Provider");

    return context;
}
