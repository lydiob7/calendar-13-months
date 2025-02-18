import { Component, FC } from "react";

export type PropFrom<TComponent> = TComponent extends FC<infer Props>
    ? Props
    : TComponent extends Component<infer Props>
    ? Props
    : never;
