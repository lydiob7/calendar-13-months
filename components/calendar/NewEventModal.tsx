import React from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useEventsContext } from "@/context/eventsContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslationsContext } from "@/context/translationsContext";
import { CustomEvent, CustomEventSchema } from "@/types/Event";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomUUID } from "expo-crypto";

const NewEventModal = () => {
    const backgroundColor = useThemeColor({}, "background");
    const disabledText = useThemeColor({}, "tabIconDefault");
    const { language } = useTranslationsContext();

    const {
        control,
        formState: { errors, isDirty, isSubmitting, isValid },
        handleSubmit
    } = useForm<CustomEvent>({
        defaultValues: { id: randomUUID(), type: "custom" },
        resolver: zodResolver(CustomEventSchema)
    });

    const { handleToggleNewEventModal, isNewEventModalOpen } = useEventsContext();

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
                    <View>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    autoFocus
                                    style={styles.input}
                                    placeholder="Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        {!!errors.title && <ThemedText style={styles.errorText}>{errors.title.message}</ThemedText>}
                    </View>

                    <View>
                        <Controller
                            name="url"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    autoFocus
                                    style={styles.input}
                                    placeholder="URL"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        {!!errors.url && <ThemedText style={styles.errorText}>{errors.url.message}</ThemedText>}
                    </View>

                    <View>
                        <Controller
                            name="location"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    autoFocus
                                    style={styles.input}
                                    placeholder="Location"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />

                        {!!errors.location && (
                            <ThemedText style={styles.errorText}>{errors.location.message}</ThemedText>
                        )}
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
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        fontSize: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 500
    }
});
