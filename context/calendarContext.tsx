import { CustomDate } from "@/utils";
import { Dispatch, ReactNode, RefObject, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type ViewMode = "gregorian" | "fixed";

interface CalendarContextProps {
    currentYear: number;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    today: CustomDate;
    viewMode: ViewMode;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
    const today = new CustomDate();

    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [viewMode, setViewMode] = useState<ViewMode>("fixed");

    const values = useMemo(
        () => ({
            currentYear,
            setCurrentYear,
            today,
            viewMode,
            setViewMode
        }),
        [currentYear, setCurrentYear, viewMode, setViewMode]
    );

    return <CalendarContext.Provider value={values}>{children}</CalendarContext.Provider>;
};

export default CalendarContextProvider;

export function useCalendarContext() {
    const context = useContext(CalendarContext);

    if (!context) throw new Error("useCalendarContext should be used inside of Calendar Context Provider");

    return context;
}
