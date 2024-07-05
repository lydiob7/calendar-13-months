import { eventsDB } from "@/@fake-db";
import SelectedDate from "@/types/SelectedDate";
import { getGregorianEquivalent } from "@/utils";
import axios from "axios";

interface GetMonthEventsProps {
    endDate: SelectedDate;
    startDate: SelectedDate;
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
}

const mainApiService = new MainApiService();

export default mainApiService;
