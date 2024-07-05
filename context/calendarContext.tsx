import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import SelectedDate from "@/types/SelectedDate";
import { CustomDate } from "@/utils";
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";

type ViewMode = "gregorian" | "fixed";

interface CalendarContextProps {
    currentMonth: GregorianMonth | FixedCalendarMonth | null;
    currentYear: number;
    handleSelectDate: (selectedDate: SelectedDate) => void;
    handleSelectFirstDayOfTheMonth: (month: GregorianMonth | FixedCalendarMonth, year: number) => void;
    handleSelectToday: () => void;
    selectedDate: SelectedDate | null;
    setCurrentMonth: Dispatch<SetStateAction<GregorianMonth | FixedCalendarMonth | null>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
    today: CustomDate;
    viewMode: ViewMode;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const today = new CustomDate();

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentMonth, setCurrentMonth] = useState<GregorianMonth | FixedCalendarMonth | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("fixed");

    const handleSelectDate = useCallback((selectedDate: SelectedDate) => {
        setSelectedDate(selectedDate);
    }, []);

    const handleSelectFirstDayOfTheMonth = useCallback((month: GregorianMonth | FixedCalendarMonth, year: number) => {
        setSelectedDate({
            date: 1,
            month,
            year
        });
    }, []);

    const handleSelectToday = useCallback(() => {
        setCurrentYear(today.getFullYear());
        handleSelectDate({
            date: today.getDate({ type: viewMode }),
            month: today.getMonthString({ type: viewMode }),
            year: today.getFullYear()
        });
        setCurrentMonth(today.getMonthString({ type: viewMode }));
    }, [handleSelectDate, viewMode]);

    const values = useMemo(
        () => ({
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectFirstDayOfTheMonth,
            handleSelectToday,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            today,
            viewMode,
            setViewMode
        }),
        [
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectFirstDayOfTheMonth,
            handleSelectToday,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            viewMode,
            setViewMode
        ]
    );

    return <CalendarContext.Provider value={values}>{children}</CalendarContext.Provider>;
};

export default CalendarContextProvider;

export function useCalendarContext() {
    const context = useContext(CalendarContext);

    if (!context) throw new Error("useCalendarContext should be used inside of Calendar Context Provider");

    return context;
}
