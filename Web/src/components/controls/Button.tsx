import "bootstrap/dist/css/bootstrap.min.css";
import styled, { ThemeProvider } from "styled-components";
import React from "react";
import { BaseControlProps, ColorType, getColorType } from "./BaseControlProps";

interface ButtonProps extends BaseControlProps {
  type?: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton = styled.button`
  font-weight: ${props => (props.theme.isBold ? "bold" : "normal")};
`;

export const Button = (props: ButtonProps) => {
  return (
    <ThemeProvider theme={props}>
      <CustomButton
        onClick={props.onClick}
        type={props.type}
        className={`form-control btn ${getColorType(props)}`}
      >
        {props.buttonText}
      </CustomButton>
    </ThemeProvider>
  );
};

// Defaults
Button.defaultProps = {
  type: "button",
  isOutlineColor: false,
  isBold: true,
  colorType: ColorType.light
};
