import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface ModalContentFieldProps {
    autoWidth?: boolean;
    content?: string | null;
    halfAndHalf?: boolean;
    label: string;
    loading?: boolean;
}

const ModalContentField: FC<ModalContentFieldProps> = ({ autoWidth, content, halfAndHalf, label, loading }) => {
    return (
        <View style={styles.contentField}>
            <ThemedText
                style={[{ fontWeight: 600, width: halfAndHalf || autoWidth ? "auto" : 80 }, halfAndHalf && { flex: 1 }]}
            >
                {label}
            </ThemedText>
            <ThemedText style={[styles.fieldContent, halfAndHalf && { flex: 1 }]}>
                {loading ? "Loading..." : content}
            </ThemedText>
        </View>
    );
};

export default ModalContentField;

const styles = StyleSheet.create({
    contentField: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 8
    },
    fieldContent: {
        flex: 1
    }
});
