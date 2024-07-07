import { CustomDate } from "@/utils";
import { LUNAR_CYCLE_DAYS_FROM_DATA_2024_MILISECONDS } from "./constants";
import LunarPhase from "./LunarPhase";

function calculateMonthPhasesFromNewMoon(newMoon: CustomDate) {
    const newMoonInMiliseconds = newMoon.getTime();
    const periodBetweenPhases = LUNAR_CYCLE_DAYS_FROM_DATA_2024_MILISECONDS / 8;

    const phases: Record<LunarPhase | "next-new-moon", CustomDate> = {
        "new-moon": newMoon,
        "waxing-crescent": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 1)),
        "first-quarter": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 2)),
        "waxing-gibbous": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 3)),
        "full-moon": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 4)),
        "waning gibbous": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 5)),
        "third-quarter": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 6)),
        "waning-crescent": new CustomDate(new Date(newMoonInMiliseconds + periodBetweenPhases * 7)),
        "next-new-moon": new CustomDate(new Date(newMoonInMiliseconds + LUNAR_CYCLE_DAYS_FROM_DATA_2024_MILISECONDS))
    };

    return phases;
}

export default calculateMonthPhasesFromNewMoon;
