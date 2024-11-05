import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import english from "../config/locales/english.json";
import spanish from "../config/locales/spanish.json";

const languagesMap = {
    en: english,
    es: spanish
} as const;

type AvailableLanguage = keyof typeof languagesMap;

interface TranslationsContextProps {
    availableLanguages: AvailableLanguage[];
    language: typeof english;
    updateLanguage: (key: AvailableLanguage) => void;
}

const TranslationsContext = createContext<TranslationsContextProps | undefined>(undefined);

const TranslationsContextProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState(languagesMap.en);
    const availableLanguages = Object.keys(languagesMap) as AvailableLanguage[];

    const updateLanguage = useCallback((key: AvailableLanguage) => {
        setLanguage(languagesMap[key]);
    }, []);

    const values = useMemo(() => ({ availableLanguages, language, updateLanguage }), [language, updateLanguage]);

    return <TranslationsContext.Provider value={values}>{children}</TranslationsContext.Provider>;
};

export default TranslationsContextProvider;

export function useTranslationsContext() {
    const context = useContext(TranslationsContext);

    if (!context) throw new Error("useTranslationsContext should be used inside of Translations Context Provider");

    return context;
}
