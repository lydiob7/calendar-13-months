import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Switch } from 'react-native-gesture-handler';
import { useUserSettingsContext } from '@/context/userSettingsContext';
import { AvailableLanguage, useTranslationsContext } from '@/context/translationsContext';
import { Dropdown } from 'react-native-element-dropdown';
import { useMemo } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface SettingsItemType {
    label: string;
    id: string;
}

const ThemeItem = ({ item }: { item: SettingsItemType }) => {
    const { handleUpdateUserColorScheme, userColorScheme } = useUserSettingsContext();
    const { language } = useTranslationsContext();

    return (
        <View style={styles.menuItem}>
            <ThemedText style={styles.menuItemLabel}>{item.label}:</ThemedText>
            <View style={styles.themeSwitch}>
                <ThemedText>{language.settings.lightTitle}</ThemedText>
                <Switch
                    onChange={() => handleUpdateUserColorScheme(userColorScheme === 'light' ? 'dark' : 'light')}
                    value={userColorScheme === 'dark'}
                />
                <ThemedText>{language.settings.darkTitle}</ThemedText>
            </View>
        </View>
    );
};

const LanguageItem = ({ item }: { item: SettingsItemType }) => {
    const textColor = useThemeColor({}, 'text');
    const { availableLanguages, language, updateLanguage } = useTranslationsContext();

    const languages = useMemo(
        () =>
            availableLanguages.map((lang) => ({
                label: language.languages[lang],
                value: lang
            })),
        [availableLanguages, language]
    );
    const handleSelectLanguage = (lang: { label: string; value: AvailableLanguage }) => {
        updateLanguage(lang.value);
    };

    return (
        <View style={styles.menuItem}>
            <ThemedText style={styles.menuItemLabel}>{item.label}</ThemedText>
            <Dropdown
                data={languages}
                labelField="label"
                valueField="value"
                onChange={handleSelectLanguage}
                placeholder="Select language"
                placeholderStyle={{ color: textColor }}
                selectedTextStyle={{ color: textColor }}
                style={{ flex: 1, maxWidth: 120, marginTop: 4 }}
                value="en"
            />
        </View>
    );
};

const SettingsItem = ({ item }: { item: SettingsItemType }) => {
    switch (item.id) {
        case 'language':
            return <LanguageItem item={item} />;
            break;
        case 'theme':
            return <ThemeItem item={item} />;
            break;
        default:
            return <ThemedText>{item.label}</ThemedText>;
    }
};

export default SettingsItem;

const styles = StyleSheet.create({
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 20
    },
    menuItemLabel: {
        fontWeight: 700
    },
    themeSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 8
    }
});
