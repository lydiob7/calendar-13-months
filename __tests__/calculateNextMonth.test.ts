import { calculateNextMonth } from "@/utils";

describe("calculateNextMonth() functionality for gregorian months", () => {
    it("Should return correct month for input within same year and not on the last month of the year", () => {
        expect(calculateNextMonth({ currentMonth: "march", currentYear: 1992 })).toEqual({
            month: "april",
            year: 1992
        });
        expect(calculateNextMonth({ currentMonth: "september", currentYear: 2024 })).toEqual({
            month: "october",
            year: 2024
        });
    });
    it("Should return correct month for last month input", () => {
        expect(calculateNextMonth({ currentMonth: "december", currentYear: 1976 })).toEqual({
            month: "january",
            year: 1977
        });
        expect(calculateNextMonth({ currentMonth: "december", currentYear: 1777 })).toEqual({
            month: "january",
            year: 1778
        });
    });
});

describe("calculateNextMonth() functionality for fixed calendar months", () => {
    it("Should return correct month for input within same year and not on the last month of the year", () => {
        expect(calculateNextMonth({ currentMonth: "asalha", currentYear: 1989 })).toEqual({
            month: "savana",
            year: 1989
        });
        expect(calculateNextMonth({ currentMonth: "phussa", currentYear: 2035 })).toEqual({
            month: "magha",
            year: 2035
        });
    });
    it("Should return correct month for last month input", () => {
        expect(calculateNextMonth({ currentMonth: "day-out-of-time", currentYear: 1998 })).toEqual({
            month: "phussa",
            year: 1999
        });
        expect(calculateNextMonth({ currentMonth: "day-out-of-time", currentYear: 1653 })).toEqual({
            month: "phussa",
            year: 1654
        });
    });
    it("Should return correct loose day for next to last month", () => {
        expect(calculateNextMonth({ currentMonth: "capaq-raymi", currentYear: 2000 })).toEqual({
            month: "day-out-of-time",
            year: 2000
        });
    });
    it("Should return correct leap day for jettha input on a leap year", () => {
        expect(calculateNextMonth({ currentMonth: "jettha", currentYear: 2004 })).toEqual({
            month: "leap-day",
            year: 2004
        });
    });
    it("Should return correct month for jettha input on a non leap year", () => {
        expect(calculateNextMonth({ currentMonth: "jettha", currentYear: 2007 })).toEqual({
            month: "asalha",
            year: 2007
        });
    });
});
