import SelectedDate from "@/types/SelectedDate";
import { getGregorianEquivalent } from "@/utils";

describe("Should return a gregorian date as string for a given gregorian date object", () => {
    it("Returns 2024-07-09 for input 9th July 2024", () => {
        const selectedDate: SelectedDate = {
            date: 9,
            month: "july",
            year: 2024
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2024-07-09");
    });
    it("Returns 1998-05-13 for input 13th May 1998", () => {
        const selectedDate: SelectedDate = {
            date: 13,
            month: "may",
            year: 1998
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("1998-05-13");
    });
    it("Returns 2048-11-11 for input 11th November 2048", () => {
        const selectedDate: SelectedDate = {
            date: 11,
            month: "november",
            year: 2048
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2048-11-11");
    });
});

describe("Should return an equivalent in gregorian date as string for a given fixed calendar date object on a non leap year", () => {
    it("Returns 3rd June 2023 for input 14th Jettha 2023", () => {
        const selectedDate: SelectedDate = {
            date: 14,
            month: "jettha",
            year: 2023
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2023-06-03");
    });
    it("Returns 9th July 2023 for input 22nd Asalha 2023", () => {
        const selectedDate: SelectedDate = {
            date: 22,
            month: "asalha",
            year: 2023
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2023-07-09");
    });
    it("Returns 31st December 1985 for input 1st Day out of time 1985", () => {
        const selectedDate: SelectedDate = {
            date: 1,
            month: "day-out-of-time",
            year: 1985
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("1985-12-31");
    });
    it("Returns 30th December 1969 for input 28th Capaq Raymi 1969", () => {
        const selectedDate: SelectedDate = {
            date: 28,
            month: "capaq-raymi",
            year: 1969
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("1969-12-30");
    });
});

describe("Should return an equivalent in gregorian date as string for a given fixed calendar date object on a leap year", () => {
    it("Returns 3rd June 2024 for input 14th Jettha 2024", () => {
        const selectedDate: SelectedDate = {
            date: 14,
            month: "jettha",
            year: 2024
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2024-06-02");
    });
    it("Returns 9th July 2024 for input 22nd Asalha 2024", () => {
        const selectedDate: SelectedDate = {
            date: 22,
            month: "asalha",
            year: 2024
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("2024-07-09");
    });
    it("Returns 31st December 1984 for input 1st Day out of time 1984", () => {
        const selectedDate: SelectedDate = {
            date: 1,
            month: "day-out-of-time",
            year: 1984
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("1984-12-31");
    });
    it("Returns 30th December 1976 for input 28th Capaq Raymi 1976", () => {
        const selectedDate: SelectedDate = {
            date: 28,
            month: "capaq-raymi",
            year: 1976
        };
        expect(getGregorianEquivalent(selectedDate)).toBe("1976-12-30");
    });
});
