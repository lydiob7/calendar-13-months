import { StyleProp, StyleSheet, Switch, SwitchProps, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

interface CustomSwitchProps extends SwitchProps {
    error?: string;
    label?: string;
    wrapperStyle?: StyleProp<ViewStyle>;
}

const CustomSwitch = (props: CustomSwitchProps) => {
    const { error, label, style, wrapperStyle, ...rest } = props;

    return (
        <View>
            <View style={[styles.switchWrapper, wrapperStyle]}>
                {label && <ThemedText>{label}</ThemedText>}
                <Switch style={[{}, style]} {...rest} />
            </View>
            {!!error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        </View>
    );
};

export default CustomSwitch;

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        padding: 6
    },
    switchWrapper: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
});
