import FixedCalendarMonth from "@/types/FixedCalendarMonth";

const fixedCalendarMonths: FixedCalendarMonth[] = [
    "phussa",
    "magha",
    "phagguna",
    "citta",
    "vesakha",
    "jettha",
    "leap-day",
    "asalha",
    "savana",
    "potthapada",
    "assayuja",
    "kattika",
    "magasira",
    "capaq-raymi",
    "day-out-of-time"
];

export const fixedCalendarMonthsMap: Record<number, FixedCalendarMonth> = {
    0: "phussa",
    1: "magha",
    2: "phagguna",
    3: "citta",
    4: "vesakha",
    5: "jettha",
    14: "leap-day",
    6: "asalha",
    7: "savana",
    8: "potthapada",
    9: "assayuja",
    10: "kattika",
    11: "magasira",
    12: "capaq-raymi",
    13: "day-out-of-time"
};

export default fixedCalendarMonths;
