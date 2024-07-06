import React from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useTranslationsContext } from "@/context/translationsContext";

const AstrologicalEvents = () => {
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");

    const { language } = useTranslationsContext();

    return (
        <>
            <Pressable>
                <View style={[styles.buttonWrapper, { backgroundColor: backgroundColor }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Ionicons name="moon-outline" color={textColor} size={24} />
                        <ThemedText style={{ color: textColor, fontSize: 18 }}>
                            {language.events.astrologicalInfoTitle}
                        </ThemedText>
                    </View>
                    <Ionicons name="chevron-forward-outline" color={textColor} size={20} />
                </View>
            </Pressable>
        </>
    );
};

export default AstrologicalEvents;

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: 12,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 1
        }
    }
});
