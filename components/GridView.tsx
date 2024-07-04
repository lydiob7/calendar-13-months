import React from "react";
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type GridViewProps<T> = {
    itemStyle?: StyleProp<ViewStyle> | ((item: T, index: number) => StyleProp<ViewStyle>);
    data: T[];
    renderView: (item: T, i: number) => JSX.Element;
    col?: number;
    style?: StyleProp<ViewStyle>;
};

const GridView = <T extends any>(props: GridViewProps<T>) => {
    const { data, renderView, col = 3 } = props;
    return (
        <View style={[styles().container, props.style]}>
            {data.map((item, i) => (
                <View
                    key={i}
                    style={[
                        styles(col).item,
                        typeof props.itemStyle === "function" ? props.itemStyle(item, i) : props.itemStyle
                    ]}
                >
                    {renderView(item, i)}
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
