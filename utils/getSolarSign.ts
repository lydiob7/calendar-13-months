import SelectedDate from "@/types/SelectedDate";
import { monthsMap } from "./calculateStartDay";
import AstrologicalSign from "@/types/AstrologicalSign";

export const handleMonths: Record<number, (day: number) => AstrologicalSign> = {
    1: function (day: number) {
        if (day <= 19) {
            return "capricorn";
        } else {
            return "aquarius";
        }
    },
    2: function (day: number) {
        if (day <= 18) {
            return "aquarius";
        } else {
            return "pisces";
        }
    },
    3: function (day: number) {
        if (day <= 20) {
            return "pisces";
        } else {
            return "aries";
        }
    },
    4: function (day: number) {
        if (day <= 19) {
            return "aries";
        } else {
            return "taurus";
        }
    },
    5: function (day: number) {
        if (day <= 20) {
            return "taurus";
        } else {
            return "gemini";
        }
    },
    6: function (day: number) {
        if (day <= 20) {
            return "gemini";
        } else {
            return "cancer";
        }
    },
    7: function (day: number) {
        if (day <= 22) {
            return "cancer";
        } else {
            return "leo";
        }
    },
    8: function (day: number) {
        if (day <= 22) {
            return "leo";
        } else {
            return "virgo";
        }
    },
    9: function (day: number) {
        if (day <= 22) {
            return "virgo";
        } else {
            return "libra";
        }
    },
    10: function (day: number) {
        if (day <= 22) {
            return "libra";
        } else {
            return "scorpio";
        }
    },
    11: function (day: number) {
        if (day <= 21) {
            return "scorpio";
        } else {
            return "sagittarius";
        }
    },
    12: function (day: number) {
        if (day <= 21) {
            return "sagittarius";
        } else {
            return "capricorn";
        }
    }
};

function getSolarSign(date: SelectedDate): AstrologicalSign {
    const getSign = handleMonths[monthsMap[date.month] + 1];
    return getSign(date.date);
}

export default getSolarSign;
