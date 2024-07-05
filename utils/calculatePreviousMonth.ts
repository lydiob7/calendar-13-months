import FixedCalendarMonth from "@/types/FixedCalendarMonth";
import GregorianMonth from "@/types/GregorianMonth";
import CustomDate from "./CustomDate";
import fixedCalendarMonths from "./fixedCalendarMonths";
import gregorianMonths from "./gregorianMonths";
import { LEAP_DAY_KEY } from "./constants";
import isFixedCalendarMonth from "./isFixedCalendarMonth";

interface CalculatePreviousMonthProps {
    currentMonth: GregorianMonth | FixedCalendarMonth;
    currentYear: number;
}

interface CalculateNextMonthReturnType {
    month: GregorianMonth | FixedCalendarMonth;
    year: number;
}

function calculatePreviousMonth({
    currentMonth,
    currentYear
}: CalculatePreviousMonthProps): CalculateNextMonthReturnType {
    const isLeapYear = new CustomDate(`${currentYear}-02-02`, { withoutTime: true }).isLeapYear();
    const fixedMonths = isLeapYear
        ? fixedCalendarMonths
        : fixedCalendarMonths.filter((month) => month !== LEAP_DAY_KEY);
    const months = isFixedCalendarMonth(currentMonth) ? fixedMonths : gregorianMonths;
    const currentMonthIndex = months.findIndex((m) => m === currentMonth);

    let newMonth: GregorianMonth | FixedCalendarMonth;
    let newYear = currentYear;

    if (currentMonthIndex === 0) {
        newYear -= 1;
        newMonth = months[months.length - 1];
    } else {
        newMonth = months[currentMonthIndex - 1];
    }

    return {
        month: newMonth,
        year: newYear
    };
}

export default calculatePreviousMonth;
