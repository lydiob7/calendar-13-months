import { CustomDate } from "@/utils";
import { addDays, subDays } from "date-fns";

interface GetMonthEventsProps {
    endDate: string;
    startDate: string;
}

interface GetYearEventsProps {
    year: number;
}

class EventsDB {
    items = [
        {
            id: "123456",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-04"
                },
                starts: {
                    date: "2024-07-04"
                }
            },
            title: "First event"
        },
        {
            id: "456789",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-04"
                },
                starts: {
                    date: "2024-07-04"
                }
            },
            title: "Second event"
        }
    ];

    getDayEvents(selectedDate: string) {
        return Promise.resolve(
            this.items.filter((event) => {
                return new CustomDate(selectedDate, { withoutTime: true }).isBetween(
                    subDays(new Date(`${event.schedule.starts.date}T00:00:00`), 1),
                    addDays(new Date(`${event.schedule.ends.date}T00:00:00`), 1)
                );
            })
        );
    }

    getMonthEvents({ endDate, startDate }: GetMonthEventsProps) {
        return Promise.resolve(this.items.map((ev) => ev.schedule.starts.date));
    }

    getYearEvents({ year }: GetYearEventsProps) {
        return Promise.resolve(this.items.map((ev) => ev.schedule.starts.date));
    }
}

const eventsDB = new EventsDB();

export default eventsDB;
