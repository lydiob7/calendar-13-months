import Event from "@/types/Event";
import { CustomDate, getAllDateStringsForDatesRange } from "@/utils";
import { orderDayEvents } from "./utils";
import { randomUUID } from "expo-crypto";
import DateString from "@/types/DateString";

interface GetMonthEventsProps {
    endDate: DateString;
    startDate: DateString;
}

class EventsDB {
    items: Event[] = [
        {
            id: randomUUID(),
            type: "custom",
            schedule: {
                allDay: false,
                ends: {
                    date: "2024-07-05",
                    time: "11:00"
                },
                starts: {
                    date: "2024-07-05",
                    time: "09:00"
                }
            },
            title: "First event with a very long title because I want to test the elipsis",
            notes: "Ac orci commodo eget interdum leo consectetur massa eu molestie mi bibendum suspendisse nulla enim mi portaest tristique metus erat elementum purus condimentum ipsum diam. Adipiscing sollicitudin tristique interdum interdum quisque sed sit ac scelerisque aliquam et euismod pellentesque congue purus nisi sed amet fusce facilisis commodo proin nulla congue.",
            location: "https://meet.google.com/efe-fwef",
            url: "https://tomiscattini.com"
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
