import DateString from "@/types/DateString";
import { SolarEvent } from "@/types/Event";
import { CustomDate } from "@/utils";
import { randomUUID } from "expo-crypto";
import {
    DECEMBER_SOLSTICE_HISTORICAL_DIFF,
    JUNE_SOLSTICE_HISTORICAL_DIFF,
    MARCH_EQUINOX_HISTORICAL_DIFF,
    SEPTEMBER_EQUINOX_HISTORICAL_DIFF,
    SOLSTICE_EQUINOX_2024_2029
} from "./constants";
import Time from "@/types/Time";
import { addDays, subDays } from "date-fns";

function createSolarEvent(date: DateString): SolarEvent | null {
    const customDate = new CustomDate(date, { withoutTime: true });
    const year = customDate.getFullYear();
    const month = customDate.getMonthString();
    const day = customDate.getDate();
    // if month or day is not one of the solar events months early return
    if (!(month in SOLSTICE_EQUINOX_2024_2029[2024]) || ![19, 20, 21, 22, 23, 24].includes(day)) return null;

    const solsticeEquinoxYear = SOLSTICE_EQUINOX_2024_2029[year as keyof typeof SOLSTICE_EQUINOX_2024_2029];

    let solsticeEquinoxMonth;
    // if year is in historical data return that
    if (solsticeEquinoxYear) {
        solsticeEquinoxMonth =
            solsticeEquinoxYear[
                month as keyof (typeof SOLSTICE_EQUINOX_2024_2029)[keyof typeof SOLSTICE_EQUINOX_2024_2029]
            ];
    } else {
        const monthIndex = customDate.getMonth();
        if (monthIndex !== 2 && monthIndex !== 5 && monthIndex !== 8 && monthIndex !== 11) return null;
        solsticeEquinoxMonth = calculateNonHistoricalMonthInfo(year, monthIndex);
    }
    const dateOfEvent = new Date(solsticeEquinoxMonth.date);
    // if date of the event is not current date earyl return
    if (dateOfEvent.getDate() !== day) return null;

    const dateOfEventString = dateOfEvent.toISOString().slice(0, 16);
    const starts = {
        date: dateOfEventString.split("T")[0] as DateString,
        time: dateOfEventString.split("T")[1] as Time
    };

    return {
        id: randomUUID(),
        type: "solar-event",
        title: solsticeEquinoxMonth.name,
        schedule: {
            allDay: false,
            starts,
            ends: starts,
            punctualEvent: true
        },
        solarType: solsticeEquinoxMonth.type
    };
}

export default createSolarEvent;

function calculateNonHistoricalMonthInfo(
    year: number,
    month: 2 | 5 | 8 | 11
): { date: string; type: "solstice" | "equinox"; name: string } {
    const isBeforeHistoricalData = year < 2024;
    const referenceData = isBeforeHistoricalData ? SOLSTICE_EQUINOX_2024_2029[2024] : SOLSTICE_EQUINOX_2024_2029[2029];

    const yearData = {
        march: { name: "march-equinox", type: "equinox" },
        june: { name: "june-solstice", type: "solstice" },
        september: { name: "september-equinox", type: "equinox" },
        december: { name: "december-solstice", type: "solstice" }
    } as const;

    switch (month) {
        case 2:
            return {
                date: new Date(
                    isBeforeHistoricalData
                        ? subDays(new Date(referenceData.march.date), MARCH_EQUINOX_HISTORICAL_DIFF * (2024 - year))
                        : addDays(new Date(referenceData.march.date), MARCH_EQUINOX_HISTORICAL_DIFF * (year - 2029))
                ).toISOString(),
                ...yearData.march
            };
        case 5:
            return {
                date: new Date(
                    isBeforeHistoricalData
                        ? subDays(new Date(referenceData.june.date), JUNE_SOLSTICE_HISTORICAL_DIFF * (2024 - year))
                        : addDays(new Date(referenceData.june.date), JUNE_SOLSTICE_HISTORICAL_DIFF * (year - 2029))
                ).toISOString(),
                ...yearData.june
            };
        case 8:
            return {
                date: new Date(
                    isBeforeHistoricalData
                        ? subDays(
                              new Date(referenceData.september.date),
                              SEPTEMBER_EQUINOX_HISTORICAL_DIFF * (2024 - year)
                          )
                        : addDays(
                              new Date(referenceData.september.date),
                              SEPTEMBER_EQUINOX_HISTORICAL_DIFF * (year - 2029)
                          )
                ).toISOString(),
                ...yearData.september
            };
        case 11:
            return {
                date: new Date(
                    isBeforeHistoricalData
                        ? subDays(
                              new Date(referenceData.december.date),
                              DECEMBER_SOLSTICE_HISTORICAL_DIFF * (2024 - year)
                          )
                        : addDays(
                              new Date(referenceData.december.date),
                              DECEMBER_SOLSTICE_HISTORICAL_DIFF * (year - 2029)
                          )
                ).toISOString(),
                ...yearData.december
            };
    }
}
