import DateString from "@/types/DateString";
import { getAllDateStringsForDatesRange } from "@/utils";
import { Moon } from "lunarphase-js";

interface CalculateMoonPhasesForRangeProps {
    endDate: DateString;
    startDate: DateString;
}

function calculateMoonPhasesForRange({ endDate, startDate }: CalculateMoonPhasesForRangeProps): DateString[] {
    const rangeDates = getAllDateStringsForDatesRange([startDate, endDate]);
    const phasesDates = rangeDates.filter((date) => {
        const datePhaseAge = Math.ceil(Moon.lunarAge(new Date(`${date}T00:00:00.000Z`)));
        const phasesAges = [0, 7, 14, 22, 29];
        if (phasesAges.includes(datePhaseAge)) return true;
        return false;
    });
    return phasesDates;
}

export default calculateMoonPhasesForRange;
