import { getAllDateStringsForDatesRange } from "@/utils";

describe("getAllDateStringsForDatesRange() functionality", () => {
    it("Should return correct array of dates within the same month no matter order of dates", () => {
        expect(getAllDateStringsForDatesRange(["2020-02-10", "2020-02-16"])).toEqual([
            "2020-02-10",
            "2020-02-11",
            "2020-02-12",
            "2020-02-13",
            "2020-02-14",
            "2020-02-15",
            "2020-02-16"
        ]);
        expect(getAllDateStringsForDatesRange(["2026-03-11", "2026-03-10"])).toEqual(["2026-03-10", "2026-03-11"]);
    });
    it("Should return correct array of dates on two adjacent months no matter order of dates", () => {
        expect(getAllDateStringsForDatesRange(["1993-02-28", "1993-03-03"])).toEqual([
            "1993-02-28",
            "1993-03-01",
            "1993-03-02",
            "1993-03-03"
        ]);
        expect(getAllDateStringsForDatesRange(["2000-07-05", "2000-06-29"])).toEqual([
            "2000-06-29",
            "2000-06-30",
            "2000-07-01",
            "2000-07-02",
            "2000-07-03",
            "2000-07-04",
            "2000-07-05"
        ]);
    });
    it("Should return correct array of dates on two adjacent months on end of february on a leap year", () => {
        expect(getAllDateStringsForDatesRange(["1992-02-28", "1992-03-03"])).toEqual([
            "1992-02-28",
            "1992-02-29",
            "1992-03-01",
            "1992-03-02",
            "1992-03-03"
        ]);
    });
});
