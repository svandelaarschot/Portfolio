import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import React from "react";
import { BaseControlProps, ColorType, getColorType } from "./BaseControlProps";

interface ButtonProps extends BaseControlProps {
  type?: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = (props: ButtonProps) => {
  const CustomButton = styled.button`
    font-weight: ${props.isBold ? "bold" : "normal"};
  `;

  return (
    <CustomButton
      onClick={props.onClick}
      type={props.type}
      className={`form-control btn ${getColorType(props)}`}
    >
      {props.buttonText}
    </CustomButton>
  );
};

// Defaults
Button.defaultProps = {
  type: "button",
  isOutlineColor: false,
  isBold: true,
  colorType: ColorType.light
};
