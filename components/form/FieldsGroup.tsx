import { StyleSheet, Switch, View, ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";

interface FieldsGroupProps extends ViewProps {}

const FieldsGroup = (props: FieldsGroupProps) => {
    const { children, style, ...rest } = props;

    return (
        <View style={[styles.fieldGroup, style]} {...rest}>
            {children}
        </View>
    );
};

export default FieldsGroup;

const styles = StyleSheet.create({
    fieldGroup: { borderWidth: 1, padding: 10, borderRadius: 8 }
});
