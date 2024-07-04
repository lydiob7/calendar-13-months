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
                    date: "2024-07-03"
                },
                starts: {
                    date: "2024-07-03"
                }
            },
            title: "First event"
        }
    ];

    getDayEvents(selectedDate: string) {
        return Promise.resolve(this.items);
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
