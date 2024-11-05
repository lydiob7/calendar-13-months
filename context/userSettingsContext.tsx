import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

type ColorScheme = "light" | "dark";

interface UserSettingsContextProps {
    handleUpdateUserColorScheme: (color: ColorScheme) => void;
    userColorScheme: ColorScheme;
}

const UserSettingsContext = createContext<UserSettingsContextProps | undefined>(undefined);

const UserSettingsContextProvider = ({ children }: { children: ReactNode }) => {
    const [userColorScheme, setUserColorScheme] = useState(useColorScheme() ?? "light");

    const handleUpdateUserColorScheme = useCallback((color: ColorScheme) => {
        setUserColorScheme(color);
    }, []);

    const values = useMemo(
        () => ({ handleUpdateUserColorScheme, userColorScheme }),
        [handleUpdateUserColorScheme, userColorScheme]
    );

    return <UserSettingsContext.Provider value={values}>{children}</UserSettingsContext.Provider>;
};

export default UserSettingsContextProvider;

export function useUserSettingsContext() {
    const context = useContext(UserSettingsContext);

    if (!context) throw new Error("useUserSettingsContext should be used inside of User Settings Context Provider");

    return context;
}
