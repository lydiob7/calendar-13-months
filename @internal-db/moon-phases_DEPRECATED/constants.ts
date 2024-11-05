import { CustomDate } from "@/utils";
import { daysToMil, hoursToMil, minToMil } from "../utils";
import LunarPhase from "./LunarPhase";
import LunarMonth from "./LunarMonth";

export const LUNAR_PHASES: LunarPhase[] = [
    "new-moon",
    "waxing-crescent",
    "first-quarter",
    "waxing-gibbous",
    "full-moon",
    "waning gibbous",
    "third-quarter",
    "waning-crescent"
];

// Data from https://en.wikipedia.org/wiki/Lunar_phase#Calculating_phase
export const LUNAR_CYCLE_IN_DAYS = 29.53059;

// Data from https://www.timeanddate.com/astronomy/moon/lunar-month.html
export const LUNAR_MONTHS_2024: LunarMonth[] = [
    {
        newMoon: new CustomDate("2024-01-11T11:57:00.000Z"),
        lunation: 1250,
        duration: daysToMil(29) + hoursToMil(11) + minToMil(2)
    },
    {
        newMoon: new CustomDate("2024-02-09T22:59:00.000Z"),
        lunation: 1251,
        duration: daysToMil(29) + hoursToMil(10) + minToMil(1)
    },
    {
        newMoon: new CustomDate("2024-03-10T09:00:00.000Z"),
        lunation: 1252,
        duration: daysToMil(29) + hoursToMil(9) + minToMil(20)
    },
    {
        newMoon: new CustomDate("2024-04-08T18:20:00.000Z"),
        lunation: 1253,
        duration: daysToMil(29) + hoursToMil(9) + minToMil(1)
    },
    {
        newMoon: new CustomDate("2024-05-08T03:21:00.000Z"),
        lunation: 1254,
        duration: daysToMil(29) + hoursToMil(9) + minToMil(16)
    },
    {
        newMoon: new CustomDate("2024-06-06T12:37:00.000Z"),
        lunation: 1255,
        duration: daysToMil(29) + hoursToMil(10) + minToMil(20)
    },
    {
        newMoon: new CustomDate("2024-07-05T22:57:00.000Z"),
        lunation: 1256,
        duration: daysToMil(29) + hoursToMil(12) + minToMil(16)
    },
    {
        newMoon: new CustomDate("2024-08-04T11:13:00.000Z"),
        lunation: 1257,
        duration: daysToMil(29) + hoursToMil(14) + minToMil(42)
    },
    {
        newMoon: new CustomDate("2024-09-03T01:55:00.000Z"),
        lunation: 1258,
        duration: daysToMil(29) + hoursToMil(16) + minToMil(54)
    },
    {
        newMoon: new CustomDate("2024-10-02T18:49:00.000Z"),
        lunation: 1259,
        duration: daysToMil(29) + hoursToMil(17) + minToMil(58)
    },
    {
        newMoon: new CustomDate("2024-11-01T12:47:00.000Z"),
        lunation: 1260,
        duration: daysToMil(29) + hoursToMil(17) + minToMil(34)
    },
    {
        newMoon: new CustomDate("2024-12-01T06:21:00.000Z"),
        lunation: 1261,
        duration: daysToMil(29) + hoursToMil(16) + minToMil(5)
    }
];

export const LUNAR_CYCLE_DAYS_FROM_DATA_2024_MILISECONDS =
    LUNAR_MONTHS_2024.reduce((prevVal, currVal) => {
        return prevVal + currVal.duration;
    }, 0) / LUNAR_MONTHS_2024.length;
