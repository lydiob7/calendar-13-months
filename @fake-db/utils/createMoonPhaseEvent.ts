import DateString from "@/types/DateString";
import { MoonPhaseEvent } from "@/types/Event";
import { randomUUID } from "expo-crypto";
import { Moon } from "lunarphase-js";
import { daysToMil } from "./toMilliseconds";
import { CustomDate } from "@/utils";
import Time from "@/types/Time";

function createMoonPhaseEvent(date: DateString): MoonPhaseEvent | null {
    const dateDate = new Date(`${date}T00:00:00.000Z`);
    const dateMoonAge = Moon.lunarAge(dateDate);
    const phasesAges = [0, 7, 14, 22, 29];
    if (phasesAges.includes(Math.round(dateMoonAge))) {
        const phaseIndex = phasesAges.indexOf(Math.round(dateMoonAge));
        const exactPhasesAges = [0, 7.38264692644, 14.76529385288, 22.14794077932, 29.53058770576];
        const milisecondsRemainingForNextPhase = daysToMil(exactPhasesAges[phaseIndex] - Math.round(dateMoonAge));
        const newDateString = new CustomDate(dateDate.getTime() + milisecondsRemainingForNextPhase).toISOString();
        const phaseExactTime = newDateString.slice(11, 16) as Time;

        const event: MoonPhaseEvent = {
            type: "moon-phase",
            id: randomUUID(),
            phaseEmoji: Moon.lunarPhaseEmoji(dateDate),
            title: Moon.lunarPhase(dateDate),
            schedule: {
                allDay: false,
                starts: { date, time: phaseExactTime },
                ends: { date, time: phaseExactTime }
            }
        };
        return event;
    }
    return null;
}

export default createMoonPhaseEvent;
