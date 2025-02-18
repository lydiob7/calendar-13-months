import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface CustomInputProps extends TextInputProps {
    error?: string;
    label?: string;
}

const CustomInput = (props: CustomInputProps) => {
    const { error, label, style, ...rest } = props;
    const textColor = useThemeColor({}, "text");
    const disabledColor = useThemeColor({}, "tabIconDefault");

    return (
        <View>
            {label && <ThemedText>{label}</ThemedText>}
            <TextInput
                placeholderTextColor={disabledColor}
                style={[styles.input, { color: textColor }, style]}
                {...rest}
            />
            {!!error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        padding: 6
    },
    input: { padding: 10, fontSize: 18 }
});
