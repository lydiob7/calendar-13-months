import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

const Settings = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <View style={styles.container}>
                <ThemedText>Settings page</ThemedText>
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
