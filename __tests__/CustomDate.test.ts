import { CustomDate } from "@/utils";

describe("CustomDate class functionality for gregorian date", () => {
    it("Creates a gregorian date", () => {
        expect(new CustomDate("2024-01-01T00:00:00").getTime()).toBe(1704078000000);
    });
    it("Returns correct full year", () => {
        expect(new CustomDate("1854-01-01T00:00:00").getFullYear()).toBe(1854);
    });
    it("Returns correct month for gregorian date", () => {
        expect(new CustomDate("1991-04-09T00:00:00").getMonth()).toBe(3);
        expect(new CustomDate("2000-06-12T00:00:00").getMonth()).toBe(5);
        expect(new CustomDate("2024-12-30T00:00:00").getMonth()).toBe(11);
    });
    it("Returns correct date for gregorian date", () => {
        expect(new CustomDate("1991-04-09T00:00:00").getDate()).toBe(9);
    });
    it("Returns correct date string for gregorian date", () => {
        expect(new CustomDate("1991-04-09T00:00:00").getDateString()).toBe("1991-04-09");
    });
    it("Returns correct week day for gregorian date", () => {
        expect(new CustomDate("1991-04-09T00:00:00").getDay()).toBe(2);
    });
    it("Returns correct day of the year for gregorian date", () => {
        expect(new CustomDate("2024-12-31T00:00:00").dayOfTheYear()).toBe(366);
    });
    it("Returns true if year is leap year for gregorian date", () => {
        expect(new CustomDate("2024-03-01T00:00:00").isLeapYear()).toBe(true);
    });
    it("Returns false if year is not leap year for gregorian date", () => {
        expect(new CustomDate("2023-03-01T00:00:00").isLeapYear()).toBe(false);
    });
});

describe("CustomDate class functionality for fixed calendar date", () => {
    it("Returns correct month for fixed calendar date on a non leap year", () => {
        expect(new CustomDate("1991-01-01T00:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("1991-01-28T00:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("1991-01-29T00:00:00").getMonth({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1991-04-09T00:00:00").getMonth({ type: "fixed" })).toBe(3);
        expect(new CustomDate("1975-12-30T00:00:00").getMonth({ type: "fixed" })).toBe(12);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("1989-12-31T00:00:00").getMonth({ type: "fixed" })).toBe(13);
    });
    it("Returns correct month for fixed calendar date on a leap year", () => {
        expect(new CustomDate("2004-01-01T00:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2024-01-02T08:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2004-01-28T00:00:00").getMonth({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2004-01-29T00:00:00").getMonth({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1996-02-29T00:00:00").getMonth({ type: "fixed" })).toBe(2);
        expect(new CustomDate("2024-06-16T05:00:00").getMonth({ type: "fixed" })).toBe(5);
        //============ LEAP DAY vv ============//
        expect(new CustomDate("2004-06-17T00:00:00").getMonth({ type: "fixed" })).toBe(14);
        expect(new CustomDate("1992-06-20T00:00:00").getMonth({ type: "fixed" })).toBe(6);
        expect(new CustomDate("2024-09-25T05:00:00").getMonth({ type: "fixed" })).toBe(9);
        expect(new CustomDate("2024-10-18T05:00:00").getMonth({ type: "fixed" })).toBe(10);
        expect(new CustomDate("2024-10-23T05:00:00").getMonth({ type: "fixed" })).toBe(10);
        expect(new CustomDate("2024-12-30T05:00:00").getMonth({ type: "fixed" })).toBe(12);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("2008-12-31T00:00:00").getMonth({ type: "fixed" })).toBe(13);
    });
    it("Returns correct date for fixed calendar date on a non leap year", () => {
        expect(new CustomDate("1989-04-09T00:00:00").getDate({ type: "fixed" })).toBe(15);
        expect(new CustomDate("1999-01-28T00:00:00").getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("1999-01-29T00:00:00").getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("1999-06-10T00:00:00").getDate({ type: "fixed" })).toBe(21);
        expect(new CustomDate("1999-06-17T00:00:00").getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("1999-12-30T00:00:00").getDate({ type: "fixed" })).toBe(28);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("1999-12-31T00:00:00").getDate({ type: "fixed" })).toBe(1);
    });
    it("Returns correct date for fixed calendar date on a leap year", () => {
        expect(new CustomDate("1992-04-09T00:00:00").getDate({ type: "fixed" })).toBe(16);
        expect(new CustomDate("2000-01-28T00:00:00").getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("2004-01-29T00:00:00").getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2004-02-29T00:00:00").getDate({ type: "fixed" })).toBe(4);
        expect(new CustomDate("2004-06-10T00:00:00").getDate({ type: "fixed" })).toBe(22);
        //============ LEAP DAY vv ============//
        expect(new CustomDate("2000-06-17T00:00:00").getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2000-06-18T00:00:00").getDate({ type: "fixed" })).toBe(1);
        expect(new CustomDate("2004-07-01T00:00:00").getDate({ type: "fixed" })).toBe(14);
        expect(new CustomDate("2004-07-14T00:00:00").getDate({ type: "fixed" })).toBe(27);
        expect(new CustomDate("2004-07-15T00:00:00").getDate({ type: "fixed" })).toBe(28);
        expect(new CustomDate("2000-12-30T00:00:00").getDate({ type: "fixed" })).toBe(28);
        //============ DAY OUT OF TIME vv ============//
        expect(new CustomDate("2000-12-31T00:00:00").getDate({ type: "fixed" })).toBe(1);
    });
    it("Returns correct date string for fixed calendar date", () => {
        expect(new CustomDate("1975-04-09T00:00:00").getDateString({ type: "fixed" })).toBe("1975-04-15");
        expect(new CustomDate("1955-06-18T00:00:00").getDateString({ type: "fixed" })).toBe("1955-07-01");
        expect(new CustomDate("2012-06-17T00:00:00").getDateString({ type: "fixed" })).toBe("2012-15-01");
        expect(new CustomDate("2004-12-31T00:00:00").getDateString({ type: "fixed" })).toBe("2004-14-01");
    });
    it("Returns correct week day for fixed calendar date", () => {
        expect(new CustomDate("2087-04-09T00:00:00").getDay({ type: "fixed" })).toBe(0);
        expect(new CustomDate("2121-08-17T00:00:00").getDay({ type: "fixed" })).toBe(4);
    });
});
