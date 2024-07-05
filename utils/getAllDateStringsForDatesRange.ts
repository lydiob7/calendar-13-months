import { compareAsc, compareDesc } from "date-fns";
import monthDaysMap from "./monthDaysMap";
import gregorianMonths from "./gregorianMonths";
import CustomDate from "./CustomDate";

function getAllDateStringsForDatesRange(dates: string[]) {
    if (dates.length !== 2) throw Error("This function expect two dates in the array");
    let startDate = dates[0];
    let endDate = dates[1];
    if (compareAsc(startDate, endDate) === 1) {
        startDate = dates[1];
        endDate = dates[0];
    }
    const startYear = startDate.slice(0, 4);
    const endYear = endDate.slice(0, 4);
    if (startYear !== endYear) throw new Error("Provide two dates on the same year");
    const startMonth = parseInt(startDate.slice(5, 7));
    const endMonth = parseInt(endDate.slice(5, 7));
    const startDay = parseInt(startDate.slice(8, 10));
    const endDay = parseInt(endDate.slice(8, 10));

    const dayStrings: string[] = [];
    for (let month = startMonth; month <= endMonth; month++) {
        const daysInMonth = monthDaysMap(new CustomDate(`${startYear}-02-02`, { withoutTime: true }).isLeapYear())[
            gregorianMonths[month - 1]
        ];
        if (startMonth === endMonth) {
            for (let day = startDay; day <= endDay; day++) {
                dayStrings.push(`${startYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
            }
        } else if (month === startMonth) {
            for (let day = startDay; day <= daysInMonth; day++) {
                dayStrings.push(`${startYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
            }
        } else if (month === endMonth) {
            for (let day = 1; day <= endDay; day++) {
                dayStrings.push(`${startYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
            }
        } else {
            for (let day = 1; day <= daysInMonth; day++) {
                dayStrings.push(`${startYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
            }
        }
    }

    return dayStrings;
}

export default getAllDateStringsForDatesRange;
