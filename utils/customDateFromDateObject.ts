import SelectedDate from "@/types/SelectedDate";
import CustomDate from "./CustomDate";
import { monthsMap } from "./calculateStartDay";

function customDateFromDateObject(date: SelectedDate) {
    return new CustomDate(
        `${date.year}-${(monthsMap[date.month] + 1).toString().padStart(2, "0")}-${date.date
            .toString()
            .padStart(2, "0")}`
    );
}

export default customDateFromDateObject;
