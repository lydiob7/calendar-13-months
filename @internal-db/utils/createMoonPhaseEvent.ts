import DateString from "@/types/DateString";
import { MoonPhaseEvent } from "@/types/Event";
import { randomUUID } from "expo-crypto";
import { Moon } from "lunarphase-js";
import { daysToMil } from "./toMilliseconds";
import { CustomDate } from "@/utils";
import Time from "@/types/Time";
import { PHASE_AGES } from "./constants";

function createMoonPhaseEvent(date: DateString): MoonPhaseEvent | null {
    const dateDate = new Date(`${date}T00:00`);
    const dateMoonAge = Moon.lunarAge(dateDate);

    if (PHASE_AGES.some((age) => age + 0.5 >= dateMoonAge && age - 0.5 < dateMoonAge)) {
        let closestDateAge = 0;
        PHASE_AGES.forEach((age) => {
            if (age + 0.5 >= dateMoonAge && age - 0.5 <= dateMoonAge) closestDateAge = age;
        });
        const difference = closestDateAge - dateMoonAge;
        const milisecondsRemainingForNextPhase = daysToMil(difference);
        const newDateInMiliseconds = Math.round(dateDate.getTime() + milisecondsRemainingForNextPhase);
        const newDateString = new CustomDate(newDateInMiliseconds).toISOString();
        const phaseExactTime = newDateString.slice(11, 16) as Time;

        const event: MoonPhaseEvent = {
            type: "moon-phase",
            id: randomUUID(),
            phaseEmoji: Moon.lunarPhaseEmoji(dateDate),
            title: Moon.lunarPhase(dateDate),
            schedule: {
                allDay: false,
                punctualEvent: true,
                starts: { date, time: phaseExactTime },
                ends: { date, time: phaseExactTime }
            }
        };
        return event;
    }
    return null;
}

export default createMoonPhaseEvent;
