import SelectedDate from "@/types/SelectedDate";
import { monthsMap } from "./calculateStartDay";
import isFixedCalendarMonth from "./isFixedCalendarMonth";
import CustomDate from "./CustomDate";

function getGregorianEquivalent(date: SelectedDate) {
    if (!isFixedCalendarMonth(date.month))
        return `${date.year}-${(monthsMap[date.month] + 1)?.toString()?.padStart(2, "0")}-${date.date
            ?.toString()
            ?.padStart(2, "0")}`;
    const isLeapYear = new CustomDate(`${date.year}-02-02T00:00:00`).isLeapYear();
    const monthIndex = monthsMap[date.month];
    let dayOfTheYear = 1;
    if (!isLeapYear || monthIndex < 6) dayOfTheYear = monthIndex * 28 + date.date;
    else if (monthIndex === 13) dayOfTheYear = 366;
    else if (monthIndex === 14) dayOfTheYear = 169;
    else dayOfTheYear = monthIndex * 28 + date.date + 1;
    const dayOfTheYearInMilliseconds = dayOfTheYear * 24 * 60 * 60 * 1000 + new Date(date.year, 0, 0).getTime();
    return new Date(dayOfTheYearInMilliseconds).toISOString().split("T")[0];
}

export default getGregorianEquivalent;
