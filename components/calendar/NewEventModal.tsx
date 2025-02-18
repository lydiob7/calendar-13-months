import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEventsContext } from "@/context/eventsContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { CustomEvent, CustomEventSchema } from "@/types/Event";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomUUID } from "expo-crypto";
import DateString from "@/types/DateString";
import CustomInput from "@/components/form/CustomInput";
import CustomSwitch from "@/components/form/CustomSwitch";
import FieldsGroup from "@/components/form/FieldsGroup";
import CustomDateTimePicker from "../form/CustomDateTimePicker";

function getDefaultValues() {
    const id = randomUUID();
    const now = new Date().toISOString();
    const starts = {
        date: now.split("T")[0] as DateString,
        time: now.split("T")[1].slice(0, 5)
    };
    const ends = {
        date: now.split("T")[0] as DateString,
        time: now.split("T")[1].slice(0, 5)
    };

    const defaultValues: CustomEvent = {
        id,
        type: "custom",
        title: "",
        schedule: {
            allDay: false,
            starts,
            ends
        }
    };

    return defaultValues;
}

const NewEventModal = () => {
    const backgroundColor = useThemeColor({}, "background");
    const disabledText = useThemeColor({}, "tabIconDefault");
    const backgroundSubtle = useThemeColor({}, "backgroundSubtle");
    const { language } = useTranslationsContext();

    const {
        control,
        formState: { errors, isDirty, isSubmitting, isValid },
        handleSubmit
    } = useForm<CustomEvent>({
        defaultValues: getDefaultValues(),
        resolver: zodResolver(CustomEventSchema)
    });

    const { handleToggleNewEventModal, isNewEventModalOpen } = useEventsContext();

    function handleChangeDate(date: Date | undefined, type: "date" | "time") {
        if (!date) return "";
        if (type === "date") return date.toISOString().split("T")[0] as DateString;
        else return date.toISOString().split("T")[1]?.slice(0, 5);

        console.log(date?.toISOString().split("T")[1]);
    }

    const onSubmit: SubmitHandler<CustomEvent> = (data) => {
        console.log(data);
    };

    return (
        <Modal
            animationType="slide"
            onRequestClose={handleToggleNewEventModal}
            presentationStyle="pageSheet"
            visible={isNewEventModalOpen}
        >
            <View style={[styles.container, { backgroundColor }]}>
                <View style={[styles.header, { borderColor: disabledText }]}>
                    <ThemedText style={styles.title}>{language.common.newEventTitle}</ThemedText>

                    <Button
                        disabled={!isDirty || !isValid || isSubmitting}
                        title={language.common.saveTitle}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>

                <View style={[styles.content, { borderColor: disabledText }]}>
                    <FieldsGroup style={{ backgroundColor: backgroundSubtle }}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomInput
                                    autoFocus
                                    error={errors.title?.message}
                                    placeholder="Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            name="url"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomInput
                                    autoCapitalize="none"
                                    error={errors.url?.message}
                                    placeholder="URL"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            name="location"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomInput
                                    error={errors.location?.message}
                                    placeholder="Location"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </FieldsGroup>

                    <View style={{ gap: 4 }}>
                        <Controller
                            name="schedule.allDay"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomSwitch
                                    error={errors.schedule?.allDay?.message}
                                    label="All Day"
                                    onValueChange={onChange}
                                    value={value}
                                    wrapperStyle={{ paddingHorizontal: 8 }}
                                />
                            )}
                        />

                        <View style={styles.dateRow}>
                            <ThemedText>Starts</ThemedText>
                            <View style={styles.datePickers}>
                                <Controller
                                    name="schedule.starts.date"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "date"))}
                                            mode="date"
                                            value={new Date(`${value}T00:00`)}
                                        />
                                    )}
                                />
                                <Controller
                                    name="schedule.starts.time"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "time"))}
                                            mode="time"
                                            value={new Date(`2024-01-01T${value}:00.000Z`)}
                                        />
                                    )}
                                />
                            </View>
                        </View>

                        <View style={styles.dateRow}>
                            <ThemedText>Ends</ThemedText>
                            <View style={styles.datePickers}>
                                <Controller
                                    name="schedule.ends.date"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "date"))}
                                            mode="date"
                                            value={new Date(`${value}T00:00:00`)}
                                        />
                                    )}
                                />
                                <Controller
                                    name="schedule.ends.time"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "time"))}
                                            mode="time"
                                            value={new Date(`2024-01-01T${value}:00.000Z`)}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default NewEventModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    content: {
        paddingVertical: 12,
        gap: 16
    },
    datePickers: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 0
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    }
});
