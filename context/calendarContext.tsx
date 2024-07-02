import SelectedDate from "@/types/SelectedDate";
import { CustomDate, fixedCalendarMonths, gregorianMonths } from "@/utils";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

type ViewMode = "gregorian" | "fixed";

interface CalendarContextProps {
    currentYear: number;
    handleSelectDate: (selectedDate: SelectedDate) => void;
    handleSelectToday: () => void;
    selectedDate: SelectedDate | null;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
    today: CustomDate;
    viewMode: ViewMode;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const today = new CustomDate();

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("fixed");

    const handleSelectDate = useCallback((selectedDate: SelectedDate) => {
        const { date, month, year } = selectedDate;
        setSelectedDate({
            date,
            month,
            year
        });
    }, []);

    const handleSelectToday = useCallback(() => {
        handleSelectDate({
            date: today.getDate({ type: viewMode }),
            month:
                viewMode === "gregorian"
                    ? gregorianMonths[today.getMonth({ type: viewMode })]
                    : fixedCalendarMonths[today.getMonth({ type: viewMode })],
            year: today.getFullYear()
        });
    }, [handleSelectDate, viewMode]);

    useEffect(() => {
        if (!selectedDate) handleSelectToday();
    }, [handleSelectToday, selectedDate]);

    const values = useMemo(
        () => ({
            currentYear,
            handleSelectDate,
            handleSelectToday,
            selectedDate,
            setCurrentYear,
            today,
            viewMode,
            setViewMode
        }),
        [currentYear, handleSelectDate, handleSelectToday, selectedDate, setCurrentYear, viewMode, setViewMode]
    );

    return <CalendarContext.Provider value={values}>{children}</CalendarContext.Provider>;
};

export default CalendarContextProvider;

export function useCalendarContext() {
    const context = useContext(CalendarContext);

    if (!context) throw new Error("useCalendarContext should be used inside of Calendar Context Provider");

    return context;
}
