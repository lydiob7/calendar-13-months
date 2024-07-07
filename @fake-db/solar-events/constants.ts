import calculateHistoricalDiff from "./utils/calculateHistoricalDiff";

export const SOLSTICE_EQUINOX_2024_2029 = {
    2024: {
        march: { date: "2024-03-20T00:06:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2024-06-20T17:50:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2024-09-22T09:43:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2024-12-21T06:20:00.000Z", name: "december-solstice", type: "solstice" }
    },
    2025: {
        march: { date: "2025-03-20T06:01:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2025-06-20T23:42:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2025-09-22T15:19:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2025-12-21T12:03:00.000Z", name: "december-solstice", type: "solstice" }
    },
    2026: {
        march: { date: "2026-03-20T11:45:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2026-06-21T05:24:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2026-09-22T21:05:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2026-12-21T17:50:00.000Z", name: "december-solstice", type: "solstice" }
    },
    2027: {
        march: { date: "2027-03-20T17:24:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2027-06-21T11:10:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2027-09-23T03:01:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2027-12-21T23:42:00.000Z", name: "december-solstice", type: "solstice" }
    },
    2028: {
        march: { date: "2028-03-19T23:17:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2028-06-20T17:01:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2028-09-22T08:45:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2028-12-21T05:19:00.000Z", name: "december-solstice", type: "solstice" }
    },
    2029: {
        march: { date: "2029-03-20T05:01:00.000Z", name: "march-equinox", type: "equinox" },
        june: { date: "2029-06-20T22:48:00.000Z", name: "june-solstice", type: "solstice" },
        september: { date: "2029-09-22T14:38:00.000Z", name: "september-equinox", type: "equinox" },
        december: { date: "2029-12-21T11:13:00.000Z", name: "december-solstice", type: "solstice" }
    }
} as const;

export const MARCH_EQUINOX_HISTORICAL_DIFF = calculateHistoricalDiff(
    Object.values(SOLSTICE_EQUINOX_2024_2029).map((year) => year.march.date)
);
export const JUNE_SOLSTICE_HISTORICAL_DIFF = calculateHistoricalDiff(
    Object.values(SOLSTICE_EQUINOX_2024_2029).map((year) => year.june.date)
);
export const SEPTEMBER_EQUINOX_HISTORICAL_DIFF = calculateHistoricalDiff(
    Object.values(SOLSTICE_EQUINOX_2024_2029).map((year) => year.september.date)
);
export const DECEMBER_SOLSTICE_HISTORICAL_DIFF = calculateHistoricalDiff(
    Object.values(SOLSTICE_EQUINOX_2024_2029).map((year) => year.december.date)
);
