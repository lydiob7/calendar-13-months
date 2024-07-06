import { CustomDate } from "@/utils";

interface LunarMonth {
    newMoon: CustomDate;
    lunation: number;
    duration: number;
}

export default LunarMonth;
