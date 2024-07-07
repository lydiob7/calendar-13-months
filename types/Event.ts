import DateString from "./DateString";
import Time from "./Time";

type EventAlert = "event-time" | "5min" | "10min" | "15min" | "30min" | "1h" | "2h" | "1d" | "2d" | "1w";
type TravelTime = "5min" | "10min" | "15min" | "30min" | "1h" | "1h30min" | "2h";
type EventRepeat = "day" | "week" | "2weeks" | "month" | "year";

interface BaseEvent {
    alert?: EventAlert;
    id: string;
    schedule: {
        allDay: boolean;
        ends: {
            date: DateString;
            time?: Time;
        };
        starts: {
            date: DateString;
            time?: Time;
        };
        punctualEvent?: boolean;
    };
    title: string;
}

export interface CustomEvent extends BaseEvent {
    type: "custom";
    location?: string;
    notes?: string;
    repeat?: EventRepeat;
    schedule: BaseEvent["schedule"] & {
        travelTime?: TravelTime;
    };
    url?: string;
}

export interface MoonPhaseEvent extends BaseEvent {
    type: "moon-phase";
    phaseEmoji: string;
}

export interface SolarEvent extends BaseEvent {
    type: "solar-event";
    solarType: "equinox" | "solstice" | "astrological-sign";
}

type Event = CustomEvent | MoonPhaseEvent | SolarEvent;

export default Event;
