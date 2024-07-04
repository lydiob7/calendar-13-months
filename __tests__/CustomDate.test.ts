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
        expect(new CustomDate("1991-04-09T00:00:00").getMonth({ type: "fixed" })).toBe(3);
    });
    it("Returns correct month for fixed calendar date on a leap year", () => {
        expect(new CustomDate("2004-06-17T00:00:00").getMonth({ type: "fixed" })).toBe(14);
        expect(new CustomDate("1992-06-20T00:00:00").getMonth({ type: "fixed" })).toBe(6);
        expect(new CustomDate("1996-02-29T00:00:00").getMonth({ type: "fixed" })).toBe(2);
        expect(new CustomDate("2008-12-31T00:00:00").getMonth({ type: "fixed" })).toBe(13);
    });
    it("Returns correct date for fixed calendar date", () => {
        expect(new CustomDate("1989-04-09T00:00:00").getDate({ type: "fixed" })).toBe(15);
        expect(new CustomDate("2000-06-17T00:00:00").getDate({ type: "fixed" })).toBe(1);
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
