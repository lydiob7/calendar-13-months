import { useCalendarContext } from "@/context/calendarContext";
import { useTranslationsContext } from "@/context/translationsContext";
import React, { useCallback, useEffect } from "react";
import * as Location from "expo-location";

const useUserGeoLocations = () => {
    const { language } = useTranslationsContext();

    const { handleSetLocation } = useCalendarContext();

    const requestLocationPermission = useCallback(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        let location = await Location.getCurrentPositionAsync({});
        handleSetLocation(location);
    }, [language]);

    useEffect(() => {
        requestLocationPermission();
    }, [requestLocationPermission]);

    return null;
};

export default useUserGeoLocations;
