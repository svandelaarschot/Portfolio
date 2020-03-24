import { CSSProperties } from "styled-components";

export enum ColorType {
  primary = "btn-outline-primary",
  secondary = "btn-outline-secondary",
  success = "btn-outline-success",
  warning = "btn-outline-warning",
  info = "btn-outline-info",
  danger = "btn-outline-danger",
  light = "btn-outline-light",
  dark = "btn-outline-dark"
}

export const getColorType = (props: BaseControlProps): string => {
  return props.isOutlineColor!
    ? props.colorType!
    : props.colorType!.replace("outline-", "");
};

export interface BaseControlProps {
  className?: string;
  isBold?: boolean;
  type?: string;
  labelText?: string;
  placeholder?: string;
  marginBottom?: number;
  style?: CSSProperties;
  value?: string;
  isRequired?: boolean;
  isOutlineColor?: boolean;
  colorType?: ColorType;
}
