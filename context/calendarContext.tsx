import routes from "@/config/routes";
import geoLocationApiService, { GetLocationInfoResponse } from "@/services/geoLocationApiService";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import Hemisphere from "@/types/Hemisphere";
import SelectedDate from "@/types/SelectedDate";
import { CustomDate } from "@/utils";
import { useLinkTo } from "@react-navigation/native";
import { LocationObject } from "expo-location";
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";

type ViewMode = "gregorian" | "fixed";

interface CalendarContextProps {
    currentMonth: GregorianMonth | FixedCalendarMonth | null;
    currentYear: number;
    handleSelectDate: (selectedDate: SelectedDate) => void;
    handleSelectFirstDayOfTheMonth: (month: GregorianMonth | FixedCalendarMonth, year: number) => void;
    handleSelectToday: () => void;
    hemisphere: Hemisphere;
    location: LocationObject | null;
    locationInformation: GetLocationInfoResponse | null;
    selectedDate: SelectedDate | null;
    setCurrentMonth: Dispatch<SetStateAction<GregorianMonth | FixedCalendarMonth | null>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    handleSetLocation: (location: LocationObject) => void;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
    today: CustomDate;
    viewMode: ViewMode;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const today = new CustomDate();

const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
    const linkTo = useLinkTo();

    const [currentMonth, setCurrentMonth] = useState<GregorianMonth | FixedCalendarMonth | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
    const [hemisphere, setHemisphere] = useState<Hemisphere>("southern");
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [locationInformation, setLocationInformation] = useState<GetLocationInfoResponse | null>(null);
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
        linkTo(`/${routes.monthView}`);
    }, [handleSelectDate, viewMode]);

    const handleSetLocation = useCallback((loc: LocationObject) => {
        setLocation(loc);
        const { latitude, longitude } = loc.coords;
        if (longitude > 0) setHemisphere("northern");
        else setHemisphere("southern");
        geoLocationApiService
            .getLocationInfo({ latitude, longitude })
            .then((res) => {
                setLocationInformation(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const values = useMemo(
        () => ({
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectFirstDayOfTheMonth,
            handleSelectToday,
            handleSetLocation,
            hemisphere,
            location,
            locationInformation,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            setViewMode,
            today,
            viewMode
        }),
        [
            currentMonth,
            currentYear,
            handleSelectDate,
            handleSelectFirstDayOfTheMonth,
            handleSelectToday,
            handleSetLocation,
            hemisphere,
            location,
            locationInformation,
            selectedDate,
            setCurrentMonth,
            setCurrentYear,
            setViewMode,
            viewMode
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
