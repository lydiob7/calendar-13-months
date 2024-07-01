import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import fixedCalendarMonths from "./fixedCalendarMonths";

function isFixedCalendarMonth(monthKey: GregorianMonth | FixedCalendarMonth) {
    // @ts-ignore
    return fixedCalendarMonths.includes(monthKey);
}

export default isFixedCalendarMonth;
