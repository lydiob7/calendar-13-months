import { calculateStartDay } from "@/utils";

describe("Calculate Start Day for a gregorian month", () => {
    it("Should return monday for January 2024", () => {
        expect(calculateStartDay("january", 2024)).toBe(1);
    });
    it("Should return monday for July 2004", () => {
        expect(calculateStartDay("july", 2004)).toBe(4);
    });
    it("Should return monday for March 1827", () => {
        expect(calculateStartDay("march", 1827)).toBe(4);
    });
    it("Should return monday for April 1991", () => {
        expect(calculateStartDay("april", 1991)).toBe(1);
    });
    it("Should return monday for May 1988", () => {
        expect(calculateStartDay("may", 1988)).toBe(0);
    });
    it("Should return monday for December 2046", () => {
        expect(calculateStartDay("december", 2046)).toBe(6);
    });
    it("Should return monday for October 2050", () => {
        expect(calculateStartDay("october", 2050)).toBe(6);
    });
});
describe("Calculate Start Day for a fixed calendar month", () => {
    it("Should return monday for Phussa 2020", () => {
        expect(calculateStartDay("phussa", 2020)).toBe(0);
    });
    it("Should return monday for Vesakha 2050", () => {
        expect(calculateStartDay("vesakha", 2050)).toBe(0);
    });
    it("Should return monday for Assayuja 1987", () => {
        expect(calculateStartDay("assayuja", 1987)).toBe(0);
    });
    it("Should return monday for Capaq Raymi 1926", () => {
        expect(calculateStartDay("capaq-raymi", 1926)).toBe(0);
    });
});
