import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: unknown) => {
    try {
        if (!value) return;

        const typeofValue = typeof value;
        let valueToStore: string = "";

        if (typeofValue === "string") valueToStore = value as string;
        else if (typeofValue === "object" || Array.isArray(value)) valueToStore = JSON.stringify(value);
        else if (typeofValue === "number" || typeofValue === "boolean") valueToStore = value.toString();
        if (!!valueToStore) {
            await AsyncStorage.setItem(`typeof-${key}`, typeofValue);
            await AsyncStorage.setItem(key, valueToStore);
            return true;
        }
    } catch (e) {
        return false;
    }
};

export const getStoredData = async (key: string) => {
    try {
        const typeofValue = await AsyncStorage.getItem(`typeof-${key}`);
        const value = await AsyncStorage.getItem(key);
        if (value !== null && typeofValue === "string") return value;
        else if (value !== null && typeofValue !== null) return JSON.parse(value);
        return value;
    } catch (e) {
        return null;
    }
};

export const removeStoredValue = async (key: string) => {
    try {
        await AsyncStorage.removeItem(`typeof-${key}`);
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

export const getAllStoredKeys = async () => {
    let keys: readonly string[] = [];
    try {
        keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (e) {
        return [];
    }
};
