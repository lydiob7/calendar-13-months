type EventAlert = "event-time" | "5min" | "10min" | "15min" | "30min" | "1h" | "2h" | "1d" | "2d" | "1w";
type TravelTime = "5min" | "10min" | "15min" | "30min" | "1h" | "1h30min" | "2h";
type EventRepeat = "day" | "week" | "2weeks" | "month" | "year";

interface Event {
    alert?: EventAlert;
    id: string;
    location?: string;
    notes?: string;
    repeat?: EventRepeat;
    schedule: {
        allDay: boolean;
        ends: {
            date: string;
            hour?: string;
        };
        starts: {
            date: string;
            hour?: string;
        };
        travelTime?: TravelTime;
    };
    title: string;
    url?: string;
}

export default Event;
