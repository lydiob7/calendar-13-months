import SelectedDate from "@/types/SelectedDate";
import customDateFromDateObject from "./customDateFromDateObject";
import isFixedCalendarMonth from "./isFixedCalendarMonth";
import getGregorianEquivalent from "./getGregorianEquivalent";
import CustomDate from "./CustomDate";

function toggleCurrentMonthViewMode(selectedDate: SelectedDate): SelectedDate {
    const isFixedMode = isFixedCalendarMonth(selectedDate.month);
    const date = isFixedMode
        ? new CustomDate(getGregorianEquivalent(selectedDate), { withoutTime: true })
        : customDateFromDateObject(selectedDate);

    return {
        date: date.getDate({ type: isFixedMode ? "gregorian" : "fixed" }),
        month: date.getMonthString({ type: isFixedMode ? "gregorian" : "fixed" }),
        year: date.getFullYear()
    };
}

export default toggleCurrentMonthViewMode;
