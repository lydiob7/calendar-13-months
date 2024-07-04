interface MethodOptions {
    type: "gregorian" | "fixed";
}

class CustomDate extends Date {
    date: Date = new Date();

    constructor(date?: string | number | Date) {
        // @ts-ignore
        super(date);

        if (date) {
            this.date = new Date(date);
        }
    }

    getDate(options?: MethodOptions) {
        const gregorianDate = this.date.getDate();
        if (options?.type === "fixed") {
            const dayOfTheYear = this.dayOfTheYear();
            const isLeapYear = this.isLeapYear();

            return isLeapYear && dayOfTheYear > 28 * 6 + 1 ? (dayOfTheYear % 28) - 1 : dayOfTheYear % 28;
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

            if (isLeapYear && dayOfTheYear === 28 * 6 + 1) return 14;
            return Math.floor((isLeapYear && dayOfTheYear > 28 * 6 ? dayOfTheYear - 1 : dayOfTheYear) / 28);
        }
        return gregorianMonth;
    }

    getFullYear() {
        return this.date.getFullYear();
    }

    isLeapYear() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    dayOfTheYear() {
        // @ts-ignore
        return Math.floor((this.date - new Date(this.date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    }
}

export default CustomDate;
