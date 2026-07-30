import { type IconName } from "./icon-names";

export interface ISelectOption {
    label: string;
    value: string | number,
    iconName?: IconName,
    img?: string
}