import { isAfter } from "date-fns";
import { fixedCalendarMonthsMap } from "./fixedCalendarMonths";
import gregorianMonths from "./gregorianMonths";
import daysOfTheWeek from "./daysOfTheWeek";

interface CustomDateOptions {
    withoutTime?: boolean;
}

interface MethodOptions {
    type: "gregorian" | "fixed";
}

class CustomDate extends Date {
    date: Date = new Date();

    constructor(date?: string | number | Date, options?: CustomDateOptions) {
        const parsedDate = date ? (options?.withoutTime ? `${date}T00:00:00` : date) : new Date();

        super(parsedDate);
        this.date = new Date(parsedDate);
    }

    dayOfTheYear() {
        // @ts-ignore
        return Math.floor((this.date - new Date(this.date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    }

    getDate(options?: MethodOptions) {
        const gregorianDate = this.date.getDate();
        if (options?.type === "fixed") {
            const dayOfTheYear = this.dayOfTheYear();
            const isLeapYear = this.isLeapYear();

            if (!isLeapYear) return dayOfTheYear % 28 === 0 ? 28 : dayOfTheYear % 28;
            if (dayOfTheYear === 28 * 6 + 1) return 1;
            if (dayOfTheYear < 28 * 6 + 1) return dayOfTheYear % 28 === 0 ? 28 : dayOfTheYear % 28;
            if ((dayOfTheYear % 28) - 1 === -1) return 27;
            if ((dayOfTheYear % 28) - 1 === 0) return 28;
            return (dayOfTheYear % 28) - 1;
        }
        return gregorianDate;
    }

    getDateString(options?: MethodOptions) {
        return `${this.getFullYear()}-${(this.getMonth(options) + 1).toString().padStart(2, "0")}-${this.getDate(
            options
        )
            .toString()
            .padStart(2, "0")}`;
    }

    getDay(options?: MethodOptions) {
        if (options?.type === "fixed") {
            const dayOfTheYear = this.dayOfTheYear();
            return ((dayOfTheYear % 28) % 7) - 1;
        }
        return this.date.getDay();
    }

    getMonth(options?: MethodOptions) {
        const gregorianMonth = this.date.getMonth();
        if (options?.type === "fixed") {
            const dayOfTheYear = this.dayOfTheYear();
            const isLeapYear = this.isLeapYear();

            if (!isLeapYear) return Math.floor((dayOfTheYear - 1) / 28);
            if (dayOfTheYear === 28 * 6 + 1) return 14;
            if (dayOfTheYear < 28 * 6 + 1) return Math.floor((dayOfTheYear - 1) / 28);
            return Math.floor((dayOfTheYear - 2) / 28) <= 0
                ? Math.floor((dayOfTheYear - 2) / 28) + 1
                : Math.floor((dayOfTheYear - 2) / 28);
        }
        return gregorianMonth;
    }

    getMonthString(options?: MethodOptions) {
        const month = this.getMonth(options);
        return options?.type === "fixed" ? fixedCalendarMonthsMap[month] : gregorianMonths[month];
    }

    getFullYear() {
        return this.date.getFullYear();
    }

    isAfter(date: CustomDate) {
        return isAfter(this.date, date.date);
    }

    isBefore(date: CustomDate) {
        return isAfter(date.date, this.date);
    }

    isBetween(beforeDate: Date, afterDate: Date) {
        return this.isAfter(new CustomDate(beforeDate)) && new CustomDate(afterDate).isAfter(this);
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    toString(options?: MethodOptions) {
        const dayOfTheWeek = this.getDay(options);
        const date = this.getDate(options).toString().padStart(2, "0");
        const month = this.getMonthString(options);
        const year = this.getFullYear();
        return `${daysOfTheWeek[dayOfTheWeek]} ${month} ${date} ${year}`;
    }
}

export default CustomDate;
