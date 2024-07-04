import { eventsDB } from "@/@fake-db";
import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import SelectedDate from "@/types/SelectedDate";
import { getGregorianEquivalent, mapDatesIntoFixedCalendar } from "@/utils";
import axios from "axios";

interface GetMonthEventsProps {
    endDate: SelectedDate;
    startDate: SelectedDate;
}

interface GetYearEventsProps {
    type: "gregorian" | "fixed";
    year: number;
}

class MainApiService {
    baseUrl = "";

    getDayEvents(selectedDate: SelectedDate) {
        return eventsDB.getDayEvents(getGregorianEquivalent(selectedDate));
    }

    getRangeEvents({ endDate, startDate }: GetMonthEventsProps) {
        return eventsDB.getMonthEvents({
            endDate: getGregorianEquivalent(endDate),
            startDate: getGregorianEquivalent(startDate)
        });
    }

    async getYearEvents({ type, year }: GetYearEventsProps) {
        const response = await eventsDB.getYearEvents({ year });
        return type === "gregorian" ? response : mapDatesIntoFixedCalendar(response);
    }
}

const mainApiService = new MainApiService();

export default mainApiService;
