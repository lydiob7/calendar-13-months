import SelectedDate from "@/types/SelectedDate";
import CustomDate from "./CustomDate";
import getGregorianEquivalent from "./getGregorianEquivalent";

function customDateFromDateObject(date: SelectedDate) {
    return new CustomDate(getGregorianEquivalent(date), { withoutTime: true });
}

export default customDateFromDateObject;
