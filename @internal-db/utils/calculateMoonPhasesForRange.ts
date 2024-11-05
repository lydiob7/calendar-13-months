import DateString from "@/types/DateString";
import { getAllDateStringsForDatesRange } from "@/utils";
import { Moon } from "lunarphase-js";
import { PHASE_AGES } from "./constants";

interface CalculateMoonPhasesForRangeProps {
    endDate: DateString;
    startDate: DateString;
}

function calculateMoonPhasesForRange({ endDate, startDate }: CalculateMoonPhasesForRangeProps): DateString[] {
    const rangeDates = getAllDateStringsForDatesRange([startDate, endDate]);
    const phasesDates = rangeDates.filter((date) => {
        const datePhaseAge = Moon.lunarAge(new Date(`${date}T00:00`));
        if (PHASE_AGES.some((age) => age + 0.5 >= datePhaseAge && age - 0.5 <= datePhaseAge)) return true;
        return false;
    });
    return phasesDates;
}

export default calculateMoonPhasesForRange;
