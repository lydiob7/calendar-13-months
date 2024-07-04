import SelectedDate from "@/types/SelectedDate";
import { calculateDayOfTheWeek, calculateStartDay } from "@/utils";

describe("Calculate day of the week for a given gregorian date", () => {
    it("Should return monday for 1st January 2024", () => {
        const selectedDate: SelectedDate = {
            date: 1,
            month: "january",
            year: 2024
        };
        const days = 31;
        const startDay = calculateStartDay("january", 2024);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("monday");
    });
    it("Should return tuesday for 23rd August 1999", () => {
        const selectedDate: SelectedDate = {
            date: 24,
            month: "august",
            year: 1999
        };
        const days = 31;
        const startDay = calculateStartDay("august", 1999);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("tuesday");
    });
    it("Should return friday for 25th July 2031", () => {
        const selectedDate: SelectedDate = {
            date: 25,
            month: "july",
            year: 2031
        };
        const days = 31;
        const startDay = calculateStartDay("july", 2031);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("friday");
    });
});

describe("Calculate day of the week for a given fixed calendar date", () => {
    it("Should return monday for 16th Savana 2001", () => {
        const selectedDate: SelectedDate = {
            date: 16,
            month: "savana",
            year: 2001
        };
        const days = 28;
        const startDay = calculateStartDay("savana", 2001);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("monday");
    });
    it("Should return tuesday for 24th Kattika 2077", () => {
        const selectedDate: SelectedDate = {
            date: 24,
            month: "kattika",
            year: 2077
        };
        const days = 28;
        const startDay = calculateStartDay("kattika", 2077);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("tuesday");
    });
    it("Should return sunday for 1st Day Out of Time 2011", () => {
        const selectedDate: SelectedDate = {
            date: 1,
            month: "day-out-of-time",
            year: 2011
        };
        const days = 1;
        const startDay = calculateStartDay("day-out-of-time", 2011);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("sunday");
    });
    it("Should return sunday for 1st Leap day 2004", () => {
        const selectedDate: SelectedDate = {
            date: 1,
            month: "leap-day",
            year: 2004
        };
        const days = 1;
        const startDay = calculateStartDay("leap-day", 2001);
        expect(calculateDayOfTheWeek({ selectedDate, days, startDay })).toBe("sunday");
    });
});
