import SettingsItem, { SettingsItemType } from '@/components/settings/SettingsItem';
import { useTranslationsContext } from '@/context/translationsContext';
import React, { useMemo } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Settings = () => {
    const { language } = useTranslationsContext();

    const menuItems: SettingsItemType[] = useMemo(
        () => [
            { label: language.settings.languageTitle, id: 'language' },
            { label: language.settings.themeTitle, id: 'theme' }
        ],
        [language]
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }}
        >
            <View style={styles.container}>
                <FlatList data={menuItems} renderItem={({ item }) => <SettingsItem item={item} />} />
            </View>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
