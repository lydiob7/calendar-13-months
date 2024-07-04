import { CustomDate } from "@/utils";

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
                return event;
                // return new CustomDate(event.schedule.starts.date, { withoutTime: true }).isAfter(
                //     new CustomDate(selectedDate, { withoutTime: true })
                // );
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
