import axios, { AxiosResponse } from "axios";

interface GetLocationInfoProps {
    latitude: number;
    longitude: number;
}

export interface GetLocationInfoResponse {
    country_iso: string;
    current_local_datetime: string;
    current_utc_datetime: string;
    dst_abbreviation: string;
    dst_offset: string;
    iana_timezone: string;
    latitude: number;
    location: string;
    longitude: number;
    offset: string;
    timezone_abbreviation: string;
}

class GeoLocationApiService {
    baseUrl = "https://api.geotimezone.com/public";

    mainService = axios.create({
        baseURL: this.baseUrl
    });

    async getLocationInfo({
        latitude,
        longitude
    }: GetLocationInfoProps): Promise<AxiosResponse<GetLocationInfoResponse>> {
        const params = `/timezone?latitude=${latitude}&longitude=${longitude}`;
        return this.mainService.get(params);
    }
}

const geoLocationApiService = new GeoLocationApiService();

export default geoLocationApiService;
