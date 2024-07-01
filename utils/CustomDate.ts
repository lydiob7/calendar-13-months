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

            return dayOfTheYear % 28;
        }
        return gregorianDate;
    }

    getDay(options?: MethodOptions) {
        if (options?.type === "fixed") return this.date.getDay();
        return this.date.getDay();
    }

    getMonth(options?: MethodOptions) {
        const gregorianMonth = this.date.getMonth();
        if (options?.type === "fixed") {
            const dayOfTheYear = this.dayOfTheYear();
            const isLeapYear = this.isLeapYear();

            return Math.floor(dayOfTheYear / 28);
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
