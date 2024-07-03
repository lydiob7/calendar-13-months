import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
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
    currentMonth: GregorianMonth | FixedCalendarMonth | null;
    currentYear: number;
    handleSelectDate: (selectedDate: SelectedDate) => void;
    handleSelectToday: () => void;
    preventAutomaticDaySelect: boolean;
    selectedDate: SelectedDate | null;
    setCurrentMonth: Dispatch<SetStateAction<GregorianMonth | FixedCalendarMonth | null>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    setPreventAutomaticDaySelect: Dispatch<SetStateAction<boolean>>;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
    today: CustomDate;
    viewMode: ViewMode;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const today = new CustomDate();

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
    const [currentMonth, setCurrentMonth] = useState<GregorianMonth | FixedCalendarMonth | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [preventAutomaticDaySelect, setPreventAutomaticDaySelect] = useState<boolean>(false);
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
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectToday,
            preventAutomaticDaySelect,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            setPreventAutomaticDaySelect,
            today,
            viewMode,
            setViewMode
        }),
        [
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectToday,
            preventAutomaticDaySelect,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            setPreventAutomaticDaySelect,
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
