import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEventsContext } from "@/context/eventsContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { alertOptions, CustomEvent, CustomEventSchema, repeatOptions, travelTimeOptions } from "@/types/Event";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomUUID } from "expo-crypto";
import DateString from "@/types/DateString";
import CustomInput from "@/components/form/CustomInput";
import CustomSwitch from "@/components/form/CustomSwitch";
import FieldsGroup from "@/components/form/FieldsGroup";
import CustomDateTimePicker from "../form/CustomDateTimePicker";
import { Dropdown } from "react-native-element-dropdown";
import { add, Duration, intervalToDuration, isBefore, roundToNearestHours } from "date-fns";

function calculateEndDate(starts: CustomEvent["schedule"]["starts"], duration: Duration = { hours: 1 }) {
    const startDate = new Date(`${starts.date}T${starts.time}:00.000Z`);
    let endDate = add(startDate, duration);

    const invalidEndDate = isBefore(endDate, startDate);
    if (invalidEndDate) {
        endDate = add(startDate, { hours: 1 });
    }

    return {
        date: endDate.toISOString().split("T")[0] as DateString,
        time: endDate.toISOString().split("T")[1].slice(0, 5)
    };
}

function getDefaultValues() {
    const id = randomUUID();
    const now = roundToNearestHours(new Date(), { roundingMethod: "ceil" }).toISOString();
    const starts = {
        date: now.split("T")[0] as DateString,
        time: now.split("T")[1].slice(0, 5)
    };
    const ends = calculateEndDate(starts);

    const defaultValues: CustomEvent = {
        alert: "none",
        id,
        location: "",
        notes: "",
        repeat: "none",
        schedule: {
            allDay: false,
            ends,
            punctualEvent: false,
            starts,
            travelTime: "none"
        },
        title: "",
        type: "custom",
        url: ""
    };

    return defaultValues;
}

const NewEventModal = () => {
    const backgroundColor = useThemeColor({}, "background");
    const [durationBetweenStartAndEndDates, setDurationBetweenStartAndEndDates] = useState<Duration>({ hours: 1 });
    const disabledText = useThemeColor({}, "tabIconDefault");
    const backgroundSubtle = useThemeColor({}, "backgroundSubtle");
    const { language } = useTranslationsContext();

    const {
        control,
        formState: { errors, isDirty, isSubmitting, isValid },
        handleSubmit,
        setValue,
        watch
    } = useForm<CustomEvent>({
        defaultValues: getDefaultValues(),
        resolver: zodResolver(CustomEventSchema)
    });

    const { handleToggleNewEventModal, isNewEventModalOpen } = useEventsContext();

    const allDayValue = watch("schedule.allDay");
    const startDate = watch("schedule.starts.date");
    const startTime = watch("schedule.starts.time");
    const endDate = watch("schedule.ends.date");
    const endTime = watch("schedule.ends.time");

    const isInvalidEndTime = useMemo(() => {
        if (!startDate || !startTime || !endDate || !endTime) return false;

        const starts = new Date(`${startDate}T${startTime}:00.000Z`);
        const ends = new Date(`${endDate}T${endTime}:00.000Z`);

        return isBefore(ends, starts);
    }, [endDate, endTime, startDate, startTime]);

    const handleChangeDate = useCallback(
        (date: Date | undefined, type: "date" | "time", input: "starts" | "ends") => {
            if (!date) return "";

            const isStartDate = type === "date" && input === "starts";
            const isStartTime = type === "time" && input === "starts";
            const isEndDate = type === "date" && input === "ends";
            const isEndTime = type === "time" && input === "ends";

            if (isStartDate || isStartTime) {
                const ends = calculateEndDate({ date: startDate, time: startTime }, durationBetweenStartAndEndDates);

                setValue("schedule.ends.date", ends.date);
                setValue("schedule.ends.time", ends.time);
            }

            let parsedDate = "";
            if (type === "date") parsedDate = date.toISOString().split("T")[0] as DateString;
            else parsedDate = date.toISOString().split("T")[1]?.slice(0, 5);

            if (isEndDate || isEndTime) {
                const starts = new Date(`${startDate}T${startTime}:00.000Z`);
                const ends = new Date(
                    `${isEndDate ? parsedDate : endDate}T${isEndTime ? parsedDate : endTime}:00.000Z`
                );
                setDurationBetweenStartAndEndDates(intervalToDuration({ start: starts, end: ends }));
            }

            return parsedDate;
        },
        [endDate, endTime, startDate, startTime, setValue]
    );

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
                                    placeholder={language.events.nameTitle}
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
                                    placeholder={language.events.urlTitle}
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
                                    placeholder={language.events.locationTitle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </FieldsGroup>

                    <View style={{ gap: 8, marginVertical: 12 }}>
                        <Controller
                            name="schedule.allDay"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomSwitch
                                    error={errors.schedule?.allDay?.message}
                                    label={language.common.allDayTitle}
                                    onValueChange={onChange}
                                    value={value}
                                    wrapperStyle={{ paddingHorizontal: 8 }}
                                />
                            )}
                        />

                        <View style={styles.dateRow}>
                            <ThemedText>{language.events.startsTitle}</ThemedText>
                            <View style={styles.datePickers}>
                                <Controller
                                    name="schedule.starts.date"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "date", "starts"))}
                                            mode="date"
                                            value={new Date(`${value}T00:00`)}
                                        />
                                    )}
                                />
                                {!allDayValue && (
                                    <Controller
                                        name="schedule.starts.time"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <CustomDateTimePicker
                                                onChange={(ev, val) =>
                                                    onChange(handleChangeDate(val, "time", "starts"))
                                                }
                                                mode="time"
                                                value={new Date(`2024-01-01T${value}:00.000Z`)}
                                            />
                                        )}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={[styles.dateRow, isInvalidEndTime ? styles.invalidDateRow : {}]}>
                            <ThemedText>{language.events.endsTitle}</ThemedText>
                            <View style={styles.datePickers}>
                                <Controller
                                    name="schedule.ends.date"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomDateTimePicker
                                            onChange={(ev, val) => onChange(handleChangeDate(val, "date", "ends"))}
                                            mode="date"
                                            value={new Date(`${value}T00:00:00`)}
                                        />
                                    )}
                                />
                                {!allDayValue && (
                                    <Controller
                                        name="schedule.ends.time"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <CustomDateTimePicker
                                                onChange={(ev, val) => onChange(handleChangeDate(val, "time", "ends"))}
                                                mode="time"
                                                value={new Date(`2024-01-01T${value}:00.000Z`)}
                                            />
                                        )}
                                    />
                                )}
                            </View>
                        </View>
                        {isInvalidEndTime && (
                            <ThemedText style={styles.errorText}>{language.events.invalidEndDate}</ThemedText>
                        )}
                    </View>

                    <View style={{ gap: 12, marginBottom: 12 }}>
                        {!allDayValue && (
                            <View style={styles.dateRow}>
                                <ThemedText style={{ flex: 1 }}>{language.events.travelTimeTitle}</ThemedText>
                                <Controller
                                    name="schedule.travelTime"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Dropdown
                                            data={travelTimeOptions.map((item) => ({
                                                label: language.events.travelTimeOptions[item],
                                                value: item
                                            }))}
                                            labelField="label"
                                            placeholder={language.common.noneTitle}
                                            style={{ flex: 1 }}
                                            valueField="value"
                                            value={value}
                                            onChange={(item) => onChange(item.value)}
                                        />
                                    )}
                                />
                            </View>
                        )}

                        <View style={styles.dateRow}>
                            <ThemedText style={{ flex: 1 }}>{language.events.repeatTitle}</ThemedText>
                            <Controller
                                name="repeat"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        data={repeatOptions.map((item) => ({
                                            label: language.events.repeatOptions[item],
                                            value: item
                                        }))}
                                        labelField="label"
                                        placeholder={language.common.neverTitle}
                                        style={{ flex: 1 }}
                                        valueField="value"
                                        value={value}
                                        onChange={(item) => onChange(item.value)}
                                    />
                                )}
                            />
                        </View>

                        <View style={styles.dateRow}>
                            <ThemedText style={{ flex: 1 }}>{language.events.alertTitle}</ThemedText>
                            <Controller
                                name="alert"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        data={alertOptions.map((item) => ({
                                            label: language.events.alertOptions[item],
                                            value: item
                                        }))}
                                        labelField="label"
                                        placeholder={language.common.neverTitle}
                                        style={{ flex: 1 }}
                                        valueField="value"
                                        value={value}
                                        onChange={(item) => onChange(item.value)}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    <FieldsGroup style={{ backgroundColor: backgroundSubtle }}>
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomInput
                                    error={errors.notes?.message}
                                    multiline
                                    placeholder={language.events.notesTitle}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </FieldsGroup>
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
    errorText: {
        color: "red",
        padding: 6
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingBottom: 12
    },
    invalidDateRow: {
        borderColor: "red",
        borderWidth: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    }
});
