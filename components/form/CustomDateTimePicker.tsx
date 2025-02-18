import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PropFrom } from "@/types/PropsFrom";

type CustomDateTimePickerProps = PropFrom<typeof DateTimePicker> & {
    error?: string;
    label?: string;
};

const CustomDateTimePicker = (props: CustomDateTimePickerProps) => {
    const { error, label, style, ...rest } = props;

    return (
        <View>
            {label && <ThemedText>{label}</ThemedText>}
            <DateTimePicker style={[styles.dateTimePicker, style]} timeZoneName="Etc/Universal" {...rest} />
            {!!error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        </View>
    );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        padding: 6
    },
    dateTimePicker: {}
});
