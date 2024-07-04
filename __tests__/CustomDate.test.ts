import { CustomDate } from "@/utils";

describe("CustomDate class functionality for gregorian date", () => {
    it("Creates a gregorian date", () => {
        expect(new CustomDate("2024-01-01", { withoutTime: true }).getTime()).toBe(1704078000000);
    });
    it("getFullYear() returns correct full year", () => {
        expect(new CustomDate("1854-01-01", { withoutTime: true }).getFullYear()).toBe(1854);
    });
    it("getMonth() returns correct month for gregorian date", () => {
        expect(new CustomDate("1991-04-09", { withoutTime: true }).getMonth()).toBe(3);
        expect(new CustomDate("2000-06-12", { withoutTime: true }).getMonth()).toBe(5);
        expect(new CustomDate("2024-12-30", { withoutTime: true }).getMonth()).toBe(11);
    });
    it("getDate() returns correct date for gregorian date", () => {
        expect(new CustomDate("1991-04-09", { withoutTime: true }).getDate()).toBe(9);
    });
    it("getDateString() returns correct date string for gregorian date", () => {
        expect(new CustomDate("1991-04-09", { withoutTime: true }).getDateString()).toBe("1991-04-09");
    });
    it("getDay() returns correct week day for gregorian date", () => {
        expect(new CustomDate("1991-04-09", { withoutTime: true }).getDay()).toBe(2);
    });
    it("dayOfTheYear() returns correct day of the year for gregorian date", () => {
        expect(new CustomDate("2024-12-31", { withoutTime: true }).dayOfTheYear()).toBe(366);
    });
    it("isLeapYear() returns true if year is leap year for gregorian date", () => {
        expect(new CustomDate("2024-03-01", { withoutTime: true }).isLeapYear()).toBe(true);
    });
    it("isLeapYear() returns false if year is not leap year for gregorian date", () => {
        expect(new CustomDate("2023-03-01", { withoutTime: true }).isLeapYear()).toBe(false);
    });
    it("isAfter() returns true if second date is before the main date for gregorian date", () => {
        const date = new CustomDate("2023-03-01", { withoutTime: true });
        const dateToCompareTo = new CustomDate("2022-06-06", { withoutTime: true });
        expect(date.isAfter(dateToCompareTo)).toBe(true);

        const date2 = new CustomDate("1988-04-16", { withoutTime: true });
        const dateToCompareTo2 = new CustomDate("1988-04-15", { withoutTime: true });
        expect(date2.isAfter(dateToCompareTo2)).toBe(true);
    });
    it("isAfter() returns false if second date is not before the main date for gregorian date", () => {
        const date = new CustomDate("2021-03-01", { withoutTime: true });
        const dateToCompareTo = new CustomDate("2022-06-06", { withoutTime: true });
        expect(date.isAfter(dateToCompareTo)).toBe(false);

        const date2 = new CustomDate("1988-04-14", { withoutTime: true });
        const dateToCompareTo2 = new CustomDate("1988-04-15", { withoutTime: true });
        expect(date2.isAfter(dateToCompareTo2)).toBe(false);
    });
    it("isBefore() returns true if second date is after the main date for gregorian date", () => {
        const date = new CustomDate("2023-03-01", { withoutTime: true });
        const dateToCompareTo = new CustomDate("2025-11-09", { withoutTime: true });
        expect(date.isBefore(dateToCompareTo)).toBe(true);

        const date2 = new CustomDate("1900-04-16", { withoutTime: true });
        const dateToCompareTo2 = new CustomDate("1900-04-17", { withoutTime: true });
        expect(date2.isBefore(dateToCompareTo2)).toBe(true);
    });
    it("isBefore() returns false if second date is not after the main date for gregorian date", () => {
        const date = new CustomDate("1999-01-08", { withoutTime: true });
        const dateToCompareTo = new CustomDate("1975-12-31", { withoutTime: true });
        expect(date.isBefore(dateToCompareTo)).toBe(false);

        const date2 = new CustomDate("2057-04-16", { withoutTime: true });
        const dateToCompareTo2 = new CustomDate("2057-04-15", { withoutTime: true });
        expect(date2.isBefore(dateToCompareTo2)).toBe(false);
    });
    it("isBetween() returns true if main date is between two parameter dates for gregorian date", () => {
        const date = new CustomDate("1999-01-08T00:00:00");
        const dateToCompareStart = new Date("1975-12-31T00:00:00");
        const dateToCompareEnd = new Date("2000-12-31T00:00:00");
        expect(date.isBetween(dateToCompareStart, dateToCompareEnd)).toBe(true);

        const date2 = new CustomDate("2025-02-27T00:00:00");
        const dateToCompareStart2 = new Date("2025-02-26T00:00:00");
        const dateToCompareEnd2 = new Date("2025-02-28T00:00:00");
        expect(date2.isBetween(dateToCompareStart2, dateToCompareEnd2)).toBe(true);
    });
    it("isBetween() returns false if main date is not between two parameter dates for gregorian date", () => {
        const date = new CustomDate("1973-01-08T00:00:00");
        const dateToCompareStart = new Date("1975-12-31T00:00:00");
        const dateToCompareEnd = new Date("2000-12-31T00:00:00");
        expect(date.isBetween(dateToCompareStart, dateToCompareEnd)).toBe(false);

        const date2 = new CustomDate("2025-02-25T00:00:00");
        const dateToCompareStart2 = new Date("2025-02-26T00:00:00");
        const dateToCompareEnd2 = new Date("2025-02-28T00:00:00");
        expect(date2.isBetween(dateToCompareStart2, dateToCompareEnd2)).toBe(false);
    });
});

describe("CustomDate class functionality for fixed calendar date", () => {
    it("Returns correct month for fixed calendar date on a non leap year", () => {
        expect(new CustomDate("1991-01-01", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("1991-01-28", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("1991-01-29", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1991-04-09", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(3);
        expect(new CustomDate("1975-12-30", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(12);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("1989-12-31", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(13);
    });
    it("getMonth() returns correct month for fixed calendar date on a leap year", () => {
        expect(new CustomDate("2004-01-01", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2024-01-02T08:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2004-01-28", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2004-01-29", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1996-02-29", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(2);
        expect(new CustomDate("2024-06-16T05:00:00").getMonth({ type: "fixed" })).toBe(5);
        //============ LEAP DAY vv ============//
        expect(new CustomDate("2004-06-17", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(14);
        expect(new CustomDate("1992-06-20", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(6);
        expect(new CustomDate("2024-09-25T05:00:00").getMonth({ type: "fixed" })).toBe(9);
        expect(new CustomDate("2024-10-18T05:00:00").getMonth({ type: "fixed" })).toBe(10);
        expect(new CustomDate("2024-10-23T05:00:00").getMonth({ type: "fixed" })).toBe(10);
        expect(new CustomDate("2024-12-30T05:00:00").getMonth({ type: "fixed" })).toBe(12);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("2008-12-31", { withoutTime: true }).getMonth({ type: "fixed" })).toBe(13);
    });
    it("getDate() returns correct date for fixed calendar date on a non leap year", () => {
        expect(new CustomDate("1989-04-09", { withoutTime: true }).getDate({ type: "fixed" })).toBe(15);
        expect(new CustomDate("1999-01-28", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("1999-01-29", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1999-06-10", { withoutTime: true }).getDate({ type: "fixed" })).toBe(21);
        expect(new CustomDate("1999-06-17", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("1999-12-30", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("1999-12-31", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
    });
    it("getDate() returns correct date for fixed calendar date on a leap year", () => {
        expect(new CustomDate("1992-04-09", { withoutTime: true }).getDate({ type: "fixed" })).toBe(16);
        expect(new CustomDate("2000-01-28", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("2004-01-29", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2004-02-29", { withoutTime: true }).getDate({ type: "fixed" })).toBe(4);
        expect(new CustomDate("2004-06-10", { withoutTime: true }).getDate({ type: "fixed" })).toBe(22);
        //============ LEAP DAY vv ============//
        expect(new CustomDate("2000-06-17", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2000-06-18", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2004-07-01", { withoutTime: true }).getDate({ type: "fixed" })).toBe(14);
        expect(new CustomDate("2004-07-14", { withoutTime: true }).getDate({ type: "fixed" })).toBe(27);
        expect(new CustomDate("2004-07-15", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("2000-12-30", { withoutTime: true }).getDate({ type: "fixed" })).toBe(28);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("2000-12-31", { withoutTime: true }).getDate({ type: "fixed" })).toBe(1);
    });
    it("getDateString() returns correct date string for fixed calendar date", () => {
        expect(new CustomDate("1975-04-09", { withoutTime: true }).getDateString({ type: "fixed" })).toBe("1975-04-15");
        expect(new CustomDate("1955-06-18", { withoutTime: true }).getDateString({ type: "fixed" })).toBe("1955-07-01");
        expect(new CustomDate("2012-06-17", { withoutTime: true }).getDateString({ type: "fixed" })).toBe("2012-15-01");
        expect(new CustomDate("2004-12-31", { withoutTime: true }).getDateString({ type: "fixed" })).toBe("2004-14-01");
    });
    it("getDay() returns correct week day for fixed calendar date", () => {
        expect(new CustomDate("2087-04-09", { withoutTime: true }).getDay({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2121-08-17", { withoutTime: true }).getDay({ type: "fixed" })).toBe(4);
    });
});
