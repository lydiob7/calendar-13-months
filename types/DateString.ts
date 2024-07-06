import Time from "./Time";

type DateString = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export type DateTimeString = `${DateString}T${Time}:00`;

export default DateString;
