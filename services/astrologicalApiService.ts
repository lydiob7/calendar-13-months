import SelectedDate from "@/types/SelectedDate";
import Time from "@/types/Time";
import { CustomDate, getGregorianEquivalent } from "@/utils";
import axios from "axios";

interface GetMoonSignNameProps {
    date: SelectedDate;
    location: string;
    time: Time;
    UTC: string;
}

class AstrologicalApiService {
    baseUrl = "https://vedastroapi.azurewebsites.net/api/Calculate/MoonSignName";

    mainService = axios.create({
        baseURL: this.baseUrl
    });

    async getMoonSignName({ date, location, time, UTC }: GetMoonSignNameProps) {
        const gregorianDate = getGregorianEquivalent(date);
        const year = gregorianDate.slice(0, 4);
        const month = gregorianDate.slice(5, 7);
        const day = gregorianDate.slice(8, 10);
        const params = `/Location/${location}/Time/${time}/${day}/${month}/${year}/${UTC}`;
        return this.mainService.get(params);
    }
}

const astrologicalApiService = new AstrologicalApiService();

export default astrologicalApiService;
