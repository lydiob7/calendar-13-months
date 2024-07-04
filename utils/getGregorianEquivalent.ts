import SelectedDate from "@/types/SelectedDate";
import { monthsMap } from "./calculateStartDay";
import isFixedCalendarMonth from "./isFixedCalendarMonth";
import CustomDate from "./CustomDate";

function getGregorianEquivalent(date: SelectedDate) {
    if (!isFixedCalendarMonth(date.month)) return `${date.year}-${monthsMap[date.month]}-${date.date}`;
    const dayOfTheYear =
        monthsMap[date.month] < 6 ? 1 : new CustomDate(`${date.year}-02-02T00:00:00`).isLeapYear() ? 2 : 3;
    return "";
}

export default getGregorianEquivalent;
