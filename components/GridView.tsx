import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

type GridViewProps<T> = {
    data: T[];
    renderView: (item: T) => JSX.Element;
    col?: number;
};

const GridView = <T extends any>(props: GridViewProps<T>) => {
    const { data, renderView, col = 3 } = props;
    return (
        <View style={styles().container}>
            {data.map((item, i) => (
                <View key={i} style={styles(col).item}>
                    {renderView(item)}
                </View>
            ))}
        </View>
    );
};

export default GridView;

const styles = (col: number = 2) =>
    StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap"
        },
        item: {
            width: (100 / col + "%") as DimensionValue,
            flexShrink: 0,
            alignItems: "center"
        }
    });
