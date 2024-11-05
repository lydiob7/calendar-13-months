import { daysFromMil } from "../utils";
import { SOLSTICE_EQUINOX_2024_2029 } from "./constants";

function calculateHistoricalSolsticeEquinoxDaysDiff(historical: typeof SOLSTICE_EQUINOX_2024_2029) {
    return daysFromMil(
        Object.values(historical)
            .map((year, yearIndex, yearArray) => {
                return (
                    Object.values(year)
                        .map((ev, i, arr) => {
                            if (i === 0 && yearIndex === 0) return 91;
                            else if (i === 0)
                                return (
                                    new Date(ev).getTime() -
                                    new Date(yearArray[yearIndex - 1]["december-solstice"]).getTime()
                                );
                            return new Date(ev).getTime() - new Date(arr[i - 1]).getTime();
                        })
                        .reduce((prev, curr) => {
                            return prev + curr;
                        }, 0) / Object.keys(year).length
                );
            })
            .reduce((prev, curr) => {
                return prev + curr;
            }, 0) / Object.keys(historical).length
    );
}

export default calculateHistoricalSolsticeEquinoxDaysDiff;
