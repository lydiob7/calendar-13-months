function divideMonthIntoWeeks({ days, startDay }: { days: number; startDay: number }) {
    const weeks: (number | null)[][] = [];

    weeks.push([]);
    for (let i = 0; i < startDay; i++) {
        weeks[0].push(null);
    }
    for (let i = 0; i < days; i++) {
        if (weeks[weeks.length - 1]?.length === 7) weeks.push([]);
        weeks[weeks.length - 1].push(i + 1);
    }

    return weeks;
}

export default divideMonthIntoWeeks;
