import { daysFromMil } from "@/@internal-db/utils";

export function calculateHistoricalDiff(historical: string[]) {
    if (historical.length < 2) return 0;
    return daysFromMil(
        historical
            .map((date, i, arr) => {
                if (i === 0) return new Date(arr[i + 1]).getTime() - new Date(date).getTime();
                return new Date(date).getTime() - new Date(arr[i - 1]).getTime();
            })
            .reduce((prev, curr) => curr + prev, 0) / historical.length
    );
}

export default calculateHistoricalDiff;
