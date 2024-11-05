import Event from "@/types/Event";

function orderDayEvents(eventsList: Event[]) {
    return eventsList.sort((a, b) => {
        const noneIsAllDay = a.schedule.allDay === false && b.schedule.allDay === false;
        if (noneIsAllDay) {
            const hourA = parseInt(a.schedule.starts.time?.split(":")[0] || "0");
            const minutesA = parseInt(a.schedule.starts.time?.split(":")[1] || "0");
            const hourB = parseInt(b.schedule.starts.time?.split(":")[0] || "0");
            const minutesB = parseInt(b.schedule.starts.time?.split(":")[1] || "0");
            if (hourA === hourB && minutesA === minutesB) return 0;
            if (hourA === hourB && minutesA > minutesB) return 1;
            if (hourA === hourB && minutesB > minutesA) return -1;
            if (hourA > hourB) return 1;
            if (hourB > hourA) return -1;
        }
        return a.schedule.allDay === b.schedule.allDay ? 0 : a.schedule.allDay ? -1 : 1;
    });
}

export default orderDayEvents;
