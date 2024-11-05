import Event, { CustomEvent } from "@/types/Event";
import { CustomDate, getAllDateStringsForDatesRange, getStoredData, storeData } from "@/utils";
import { calculateMoonPhasesForRange, createMoonPhaseEvent, orderDayEvents } from "./utils";
import { randomUUID } from "expo-crypto";
import DateString from "@/types/DateString";
import { calculateSolarEventsForRange, createSolarEvent } from "./solar-events";

interface GetMonthEventsProps {
    endDate: DateString;
    startDate: DateString;
}

class EventsDB {
    items: Event[];

    constructor() {
        this.items = [];
        getStoredData("user-items")
            .then((items) => {
                this.items = items || [];
            })
            .catch(() => {
                this.items = [];
            });
    }

    async addEvent(newEvent: CustomEvent) {
        const newItemsArray = [...this.items, newEvent];
        const success = await storeData("user-items", newItemsArray);
        if (success) {
            this.items = newItemsArray;
            return true;
        }
        return false;
    }

    getDayEvents(selectedDate: DateString) {
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

        // create moon phase event if required
        const moonPhaseEvent = createMoonPhaseEvent(selectedDate);
        if (moonPhaseEvent) dayEvents.unshift(moonPhaseEvent);

        // create solar event if required
        const solarEvent = createSolarEvent(selectedDate);
        if (solarEvent) dayEvents.unshift(solarEvent);

        return Promise.resolve(orderDayEvents(dayEvents));
    }

    getMonthEvents({ endDate, startDate }: GetMonthEventsProps) {
        const moonPhasesDates = calculateMoonPhasesForRange({ endDate, startDate });
        const solarEvents = calculateSolarEventsForRange({ endDate, startDate });
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
        // Array with only "one day" events' date as string (custom events + moon phases + solar events)
        const oneDayEvents = monthEventsDates.filter((ev) => ev.length === 1).flat();
        const dayStrings = [...oneDayEvents, ...moonPhasesDates, ...solarEvents];
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
