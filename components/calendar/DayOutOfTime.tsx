import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

const DayOutOfTime = () => {
    return (
        <View style={styles.day}>
            <Image source={require("@/assets/images/day-out-of-time.png")} style={styles.image} />
        </View>
    );
};

export default DayOutOfTime;

const styles = StyleSheet.create({
    day: {
        padding: 0,
        fontSize: 10
    },
    image: {
        height: 62,
        width: "100%",
        marginTop: 4
    }
});
