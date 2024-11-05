import DateString from "@/types/DateString";
import { getAllDateStringsForDatesRange } from "@/utils";
import createSolarEvent from "./createSolarEvent";

interface CalculateSolarEventsForRangeProps {
    endDate: DateString;
    startDate: DateString;
}

function calculateSolarEventsForRange({ endDate, startDate }: CalculateSolarEventsForRangeProps): DateString[] {
    const rangeDates = getAllDateStringsForDatesRange([startDate, endDate]);
    const eventDates = rangeDates.filter((date) => {
        const solarEvent = createSolarEvent(date);
        if (!solarEvent) return false;
        return solarEvent.schedule.starts;
    });
    return eventDates;
}

export default calculateSolarEventsForRange;
