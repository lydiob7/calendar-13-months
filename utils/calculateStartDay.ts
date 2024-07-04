import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import isFixedCalendarMonth from "./isFixedCalendarMonth";

export const monthsMap = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
    phussa: 0,
    magha: 1,
    phagguna: 2,
    citta: 3,
    vesakha: 4,
    jettha: 5,
    asalha: 6,
    savana: 7,
    potthapada: 8,
    assayuja: 9,
    kattika: 10,
    magasira: 11,
    "capaq raymi": 12,
    "day-out-of-time": 13,
    "leap-day": 14
};

function calculateStartDay(month: GregorianMonth | FixedCalendarMonth, year: number) {
    if (isFixedCalendarMonth(month)) return 0;
    const day = new Date(`${year}-${(monthsMap[month] + 1).toString().padStart(2, "0")}-01T00:00:00`).getDay();
    return day;
}

export default calculateStartDay;
