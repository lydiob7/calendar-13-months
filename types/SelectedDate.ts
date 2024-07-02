import FixedCalendarMonth from "./FixedCalendarMonth";
import GregorianMonth from "./GregorianMonth";

type SelectedDate = {
    date: number;
    month: GregorianMonth | FixedCalendarMonth;
    year: number;
};

export default SelectedDate;
