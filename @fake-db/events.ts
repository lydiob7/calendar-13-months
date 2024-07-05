import Event from "@/types/Event";
import { CustomDate, getAllDateStringsForDatesRange } from "@/utils";
import { orderDayEvents } from "./utils";

interface GetMonthEventsProps {
    endDate: string;
    startDate: string;
}

class EventsDB {
    items: Event[] = [
        {
            id: "123456",
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-07-02",
                    time: "11:00"
                },
                starts: {
                    date: "2024-06-28",
                    time: "09:00"
                }
            },
            title: "First event"
        },
        {
            id: "456789",
            type: "custom",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-05"
                },
                starts: {
                    date: "2024-07-05"
                }
            },
            title: "Second event"
        },
        {
            id: "1afds23456",
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-07-05",
                    time: "09:00"
                },
                starts: {
                    date: "2024-07-05",
                    time: "07:05"
                }
            },
            title: "Third event"
        },
        {
            id: "4567wert89",
            type: "custom",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-05"
                },
                starts: {
                    date: "2024-07-05"
                }
            },
            title: "Fourth event"
        },
        {
            id: "123shgdf456",
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-07-05",
                    time: "07:30"
                },
                starts: {
                    date: "2024-07-05",
                    time: "07:00"
                }
            },
            title: "Fifth event"
        },
        {
            id: "456whh789",
            type: "custom",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-05"
                },
                starts: {
                    date: "2024-07-05"
                }
            },
            title: "Sixth event"
        },
        {
            id: "1234juj56",
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-07-05",
                    time: "15:00"
                },
                starts: {
                    date: "2024-07-05",
                    time: "14:45"
                }
            },
            title: "Seventh event"
        },
        {
            id: "456dfhje∂789",
            type: "custom",
            schedule: {
                allDay: true,
                ends: {
                    date: "2024-07-07"
                },
                starts: {
                    date: "2024-07-07"
                }
            },
            title: "Eighth event"
        },
        {
            id: "4562dfhje∂789",
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-06-30",
                    time: "14:00"
                },
                starts: {
                    date: "2024-06-30",
                    time: "13:30"
                }
            },
            title: "Nineth event"
        }
    ];

    getDayEvents(selectedDate: string) {
        const dayEvents = this.items.filter((event) => {
            return (
                // events that start on the same selected date
                selectedDate === event.schedule.starts.date ||
                // events that ends on the same selected date
                selectedDate === event.schedule.ends.date ||
                // events that contain the selected date in between
                new CustomDate(selectedDate, { withoutTime: true }).isBetween(
                    new Date(`${event.schedule.starts.date}T00:00:00`),
                    new Date(`${event.schedule.ends.date}T00:00:00`)
                )
            );
        });
        return Promise.resolve(orderDayEvents(dayEvents));
    }

    getMonthEvents({ endDate, startDate }: GetMonthEventsProps) {
        const monthEvents = this.items.filter((event) => {
            const eventStartDate = event.schedule.starts.date;
            const eventEndDate = event.schedule.ends.date;
            return (
                // events that start on the first day of the range
                startDate === event.schedule.starts.date ||
                // events that ends on the last day of the range
                endDate === event.schedule.ends.date ||
                // events that ends on the first day of the range
                startDate === event.schedule.ends.date ||
                // events that start on the last day of the range
                endDate === event.schedule.starts.date ||
                // events that start in between range
                new CustomDate(eventStartDate, { withoutTime: true }).isBetween(
                    new Date(`${startDate}T00:00:00`),
                    new Date(`${endDate}T00:00:00`)
                ) ||
                // events that ends in between range
                new CustomDate(eventEndDate, { withoutTime: true }).isBetween(
                    new Date(`${startDate}T00:00:00`),
                    new Date(`${endDate}T00:00:00`)
                )
            );
        });
        // Array of event range, using only one date if starts and ends on the same date
        const monthEventsDates = monthEvents.map((event) => [
            ...new Set([event.schedule.starts.date, event.schedule.ends.date])
        ]);
        // Array with only "one day" events' date as string
        const oneDayEvents = monthEventsDates.filter((ev) => ev.length === 1).flat();
        const dayStrings = oneDayEvents;
        // Array with only "multiple days" events' dates as array of two strings
        const multipleDayEvents = monthEventsDates.filter((ev) => ev.length > 1);
        // Get all intermediate dates from multiple days events
        if (multipleDayEvents.length > 0) {
            multipleDayEvents.forEach((eventRange) => {
                dayStrings.push(...getAllDateStringsForDatesRange(eventRange));
            });
        }
        // Return array of date strings removing duplicates
        return Promise.resolve([...new Set(dayStrings)]);
    }
}

const eventsDB = new EventsDB();

export default eventsDB;
