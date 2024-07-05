import SelectedDate from "@/types/SelectedDate";
import { toggleCurrentMonthViewMode } from "@/utils";

describe("toggleCurrentMonthViewMode() functionality", () => {
    it("Should return correct fixed calendar date for a gregorian date", () => {
        const fromDate: SelectedDate = {
            date: 5,
            month: "july",
            year: 2024
        };
        const toDate: SelectedDate = {
            date: 18,
            month: "asalha",
            year: 2024
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct fixed calendar date for a gregorian date 1st day of the year", () => {
        const fromDate: SelectedDate = {
            date: 1,
            month: "january",
            year: 1988
        };
        const toDate: SelectedDate = {
            date: 1,
            month: "phussa",
            year: 1988
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct fixed calendar date for a gregorian date leap day on a leap year", () => {
        const fromDate: SelectedDate = {
            date: 17,
            month: "june",
            year: 1992
        };
        const toDate: SelectedDate = {
            date: 1,
            month: "leap-day",
            year: 1992
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct fixed calendar date for last day of the year", () => {
        const fromDate: SelectedDate = {
            date: 31,
            month: "december",
            year: 1999
        };
        const toDate: SelectedDate = {
            date: 1,
            month: "day-out-of-time",
            year: 1999
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct gregorian date for a fixed calendar date", () => {
        const fromDate: SelectedDate = {
            date: 18,
            month: "asalha",
            year: 2024
        };
        const toDate: SelectedDate = {
            date: 5,
            month: "july",
            year: 2024
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct gregorian date for leap day on a leap year", () => {
        const fromDate: SelectedDate = {
            date: 1,
            month: "leap-day",
            year: 1992
        };
        const toDate: SelectedDate = {
            date: 17,
            month: "june",
            year: 1992
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
    it("Should return correct gregorian date for last day of the year", () => {
        const fromDate: SelectedDate = {
            date: 1,
            month: "day-out-of-time",
            year: 1999
        };
        const toDate: SelectedDate = {
            date: 31,
            month: "december",
            year: 1999
        };
        expect(toggleCurrentMonthViewMode(fromDate)).toEqual(toDate);
    });
});
