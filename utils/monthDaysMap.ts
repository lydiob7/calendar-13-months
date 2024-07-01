function monthDaysMap(isLeapYear?: boolean): Record<string, number> {
    return {
        january: 31,
        february: isLeapYear ? 29 : 28,
        march: 31,
        april: 30,
        may: 31,
        june: 30,
        july: 31,
        august: 31,
        september: 30,
        october: 31,
        november: 30,
        december: 31,
        default: 28
    };
}

export default monthDaysMap;
