import { calculatePreviousMonth } from "@/utils";

describe("calculatePreviousMonth() functionality for gregorian months", () => {
    it("Should return correct month for input within same year and not on the last month of the year", () => {
        expect(calculatePreviousMonth({ currentMonth: "march", currentYear: 1992 })).toEqual({
            month: "february",
            year: 1992
        });
        expect(calculatePreviousMonth({ currentMonth: "september", currentYear: 2024 })).toEqual({
            month: "august",
            year: 2024
        });
    });
    it("Should return correct month for first month input", () => {
        expect(calculatePreviousMonth({ currentMonth: "january", currentYear: 1976 })).toEqual({
            month: "december",
            year: 1975
        });
        expect(calculatePreviousMonth({ currentMonth: "january", currentYear: 1777 })).toEqual({
            month: "december",
            year: 1776
        });
    });
});

describe("calculatePreviousMonth() functionality for fixed calendar months", () => {
    it("Should return correct month for input within same year and not on the last month of the year", () => {
        expect(calculatePreviousMonth({ currentMonth: "assayuja", currentYear: 1989 })).toEqual({
            month: "potthapada",
            year: 1989
        });
        expect(calculatePreviousMonth({ currentMonth: "savana", currentYear: 2035 })).toEqual({
            month: "asalha",
            year: 2035
        });
    });
    it("Should return correct month for first month input", () => {
        expect(calculatePreviousMonth({ currentMonth: "phussa", currentYear: 1998 })).toEqual({
            month: "day-out-of-time",
            year: 1997
        });
        expect(calculatePreviousMonth({ currentMonth: "phussa", currentYear: 1653 })).toEqual({
            month: "day-out-of-time",
            year: 1652
        });
    });
    it("Should return correct leap day for asalha input on a leap year", () => {
        expect(calculatePreviousMonth({ currentMonth: "asalha", currentYear: 2008 })).toEqual({
            month: "leap-day",
            year: 2008
        });
    });
    it("Should return correct month for asalha input on a non leap year", () => {
        expect(calculatePreviousMonth({ currentMonth: "asalha", currentYear: 2011 })).toEqual({
            month: "jettha",
            year: 2011
        });
    });
});
