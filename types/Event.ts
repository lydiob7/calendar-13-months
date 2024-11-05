import { z } from "zod";

const EventBaseScheduleSchema = z.object({
    allDay: z.boolean(),
    starts: z.object({
        date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
        time: z
            .string()
            .regex(/[0-9]{2}:[0-9]{2}/)
            .optional()
    }),
    ends: z.object({
        date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
        time: z
            .string()
            .regex(/[0-9]{2}:[0-9]{2}/)
            .optional()
    }),
    punctualEvent: z.boolean().optional()
});

const BaseEventSchema = z.object({
    alert: z.enum(["event-time", "5min", "10min", "15min", "30min", "1h", "2h", "1d", "2d", "1w"]).optional(),
    id: z.string(),
    title: z.string().min(1),
    schedule: EventBaseScheduleSchema
});

type BaseEvent = z.infer<typeof BaseEventSchema>;
export type EventAlert = BaseEvent["alert"];

export const CustomEventSchema = BaseEventSchema.extend({
    type: z.literal("custom"),
    location: z.string().optional(),
    notes: z.string().optional(),
    repeat: z.enum(["day", "week", "2weeks", "month", "year"]).optional(),
    schedule: EventBaseScheduleSchema.extend({
        travelTime: z.enum(["5min", "10min", "15min", "30min", "1h", "1h30min", "2h"]).optional()
    }),
    url: z.string().url("Provide a valid URL").optional()
});

export type CustomEvent = z.infer<typeof CustomEventSchema>;

export type TravelTime = CustomEvent["schedule"]["travelTime"];
export type EventRepeat = CustomEvent["repeat"];

const MoonPhaseEventSchema = BaseEventSchema.extend({
    type: z.literal("moon-phase"),
    phaseEmoji: z.string()
});

export type MoonPhaseEvent = z.infer<typeof MoonPhaseEventSchema>;

const SolarEventSchema = BaseEventSchema.extend({
    type: z.literal("solar-event"),
    solarType: z.enum(["equinox", "solstice"])
});

export type SolarEvent = z.infer<typeof SolarEventSchema>;

type Event = CustomEvent | MoonPhaseEvent | SolarEvent;

export default Event;
