import SelectedDate from "@/types/SelectedDate";
import divideMonthIntoWeeks from "./divideMonthIntoWeeks";
import daysOfTheWeek from "./daysOfTheWeek";

function calculateDayOfTheWeek({
    selectedDate,
    days,
    startDay
}: {
    selectedDate: SelectedDate | null;
    days: number;
    startDay: number;
}) {
    if (!selectedDate) return null;
    const weeks = divideMonthIntoWeeks({ days, startDay });
    let dayOfTheWeek = "";
    weeks.forEach((week) => {
        if (week.includes(selectedDate.date)) dayOfTheWeek = daysOfTheWeek[week.indexOf(selectedDate.date)];
    });
    return dayOfTheWeek;
}

export default calculateDayOfTheWeek;
